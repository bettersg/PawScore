import { Upload } from "@contract";
import { Storage } from "@google-cloud/storage";
import crypto from "crypto";
import express from "express";
import FileType from "file-type";
import mime from "mime-types";
import {
  BadRequestError,
  Get,
  JsonController,
  NotFoundError,
  Post,
  Req,
  UseBefore,
} from "routing-controllers";
import sharp from "sharp";
import { Readable } from "stream";
import { z } from "zod";
import fullConfig from "../config/config";
import { IsLoggedInMiddleware } from "../helpers/auth";
import { Upload as UploadModel } from "../models/upload";
import { zodBase64FileSchema } from "../utils/validation";

const MAX_FILE_SIZE_MB = 10;
const MAX_IMAGE_SIZE_MB = 5;
const ALLOWED_FILE_MIME_TYPES = [
  "image/png",
  "image/jpeg",
  "video/mp4",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
];
const ALLOWED_IMAGE_MIME_TYPES = ["image/png", "image/jpeg"];

let storage = new Storage();

if (fullConfig.googleSvcAcctKey !== "") {
  storage = new Storage({ keyFilename: fullConfig.googleSvcAcctKey });
}

const storageBucketName = fullConfig.storageBucketName;

const UploadRequestQuerySchema = z.object({
  originalFileName: z.string(),
  base64File: zodBase64FileSchema(MAX_FILE_SIZE_MB),
});

const UploadImageRequestQuerySchema = z.object({
  originalFileName: z.string(),
  base64File: zodBase64FileSchema(MAX_IMAGE_SIZE_MB),
});

@JsonController("/api/upload")
export class UploadController {
  @Post()
  @UseBefore(IsLoggedInMiddleware)
  async upload(
    @Req() req: express.Request,
  ): Promise<Upload.uploadApiDomain.response> {
    const input = UploadRequestQuerySchema.parse(req.body);

    const {
      buffer,
      mimeType,
      extension,
    } = await this.validateAndExtractFileInfo(
      input,
      ALLOWED_FILE_MIME_TYPES,
    );

    const newFileName = makeRandomName() + "." + extension;

    await this.saveBufferToBucket(newFileName, mimeType, buffer);

    const uploadRecord = {
      userId: req.user.id,
      originalFilename: input.originalFileName,
      filename: newFileName,
    };
    await UploadModel.create(uploadRecord);

    return {
      message: "You have successfully uploaded the file",
      payload: {
        originalFileName: input.originalFileName,
        fileName: newFileName,
        url: `https://storage.googleapis.com/${storageBucketName}/${newFileName}`,
      },
    };
  }

  @Post("/image")
  @UseBefore(IsLoggedInMiddleware)
  async uploadImage(
    @Req() req: express.Request,
  ): Promise<Upload.uploadImageApiDomain.response> {
    const input = UploadImageRequestQuerySchema.parse(req.body);

    const { buffer } = await this.validateAndExtractFileInfo(
      input,
      ALLOWED_IMAGE_MIME_TYPES,
    );

    const imageBuffer = await this.resizeAndConvertImageToJpeg(buffer, { width: 1000 });
    const thumbnailBuffer = await this.resizeAndConvertImageToJpeg(buffer, {
      width: 500,
      height: 500,
    });

    const newFileName = makeRandomName();
    const imageFileName = newFileName + ".jpg";
    const thumbnailFileName = newFileName + "_thumbnail.jpg";

    await this.saveBufferToBucket(imageFileName, "image/jpeg", imageBuffer);
    await this.saveBufferToBucket(
      thumbnailFileName,
      "image/jpeg",
      thumbnailBuffer,
    );

    await UploadModel.create({
      userId: req.user.id,
      originalFilename: input.originalFileName,
      filename: imageFileName,
    });

    await UploadModel.create({
      userId: req.user.id,
      originalFilename: input.originalFileName,
      filename: thumbnailFileName,
    });

    return {
      message: "You have successfully uploaded the file",
      payload: {
        originalFileName: input.originalFileName,
        fileName: imageFileName,
        url: `https://storage.googleapis.com/${storageBucketName}/${imageFileName}`,
        thumbnailUrl: `https://storage.googleapis.com/${storageBucketName}/${thumbnailFileName}`,
      },
    };
  }

  @Get("/:uploadId")
  @UseBefore(IsLoggedInMiddleware)
  async download(
    @Req() req: express.Request,
  ): Promise<Upload.downloadApiDomain.response> {
    // the below checks for file ID & user ID authorization
    const upload = await UploadModel.findOne({
      where: {
        id: req.params.uploadId,
        userId: req.user.id,
      },
    });

    if (!upload) {
      throw new NotFoundError("File ID does not exist");
    }

    const filename = upload.filename;

    const fileStream = storage
      .bucket(storageBucketName)
      .file(filename)
      .createReadStream();

    const base64Content = await streamToString(fileStream);
    const result = {
      status: "success",
      message: "",
      payload: base64Content,
    };
    return result;
  }

  private async validateAndExtractFileInfo(
    input: z.infer<typeof UploadRequestQuerySchema>,
    allowedMimeTypes: string[],
  ) {
    const buffer = Buffer.from(input.base64File, "base64");
    const fileType = await FileType.fromBuffer(buffer);
    const mimeTypeFromExt = mime.lookup(input.originalFileName);

    if (!fileType) {
      throw new BadRequestError("Invalid file: no mime type detected");
    }

    if (!mimeTypeFromExt) {
      throw new BadRequestError("Invalid file: missing extension");
    }

    if (mimeTypeFromExt !== fileType.mime) {
      throw new BadRequestError(
        "Invalid file: mismatched type and extension",
      );
    }

    if (!allowedMimeTypes.includes(mimeTypeFromExt)) {
      throw new BadRequestError("Invalid file: mime type not allowed");
    }

    return { buffer, mimeType: fileType.mime, extension: fileType.ext };
  }

  private async resizeAndConvertImageToJpeg(
    buffer: Buffer,
    options: { width?: number; height?: number },
  ) {
    return await sharp(buffer)
      .resize({ width: options.width, height: options.height, withoutEnlargement: true })
      .jpeg({ mozjpeg: true })
      .toBuffer();
  }

  private async saveBufferToBucket(
    fileName: string,
    mimeType: string,
    buffer: Buffer,
  ) {
    const uploadBucket = storage.bucket(storageBucketName);
    const file = uploadBucket.file(fileName);

    try {
      await file.save(buffer, { contentType: mimeType });
    } catch (err) {
      console.log(
        "Error during file upload: " +
        (err instanceof Error ? err.message : "unknown"),
      );
      throw new Error("Failed to upload file");
    }
  }
}

function makeRandomName(): string {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = 29;
  for (let i = 0; i < charactersLength; i++) {
    if (i % 5 === 4) {
      result += "-";
    } else {
      result += characters.charAt(crypto.randomInt(0, characters.length));
    }
  }
  return result;
}

async function streamToString(stream: Readable): Promise<string> {
  const chunks: Uint8Array[] = [];
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk: Uint8Array) =>
      chunks.push(Buffer.from(chunk)),
    );
    stream.on("error", (err) => reject(err));
    stream.on("end", () =>
      resolve(Buffer.concat(chunks).toString("base64")),
    );
  });
}
