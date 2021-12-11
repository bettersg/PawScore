import { Storage } from "@google-cloud/storage";
import crypto from "crypto";
import express from "express";
import FileType from "file-type";
import { StatusCodes } from "http-status-codes";
import mime from "mime-types";
import { BadRequestError } from "routing-controllers";
import { Readable } from "stream";
import { z } from "zod";
import fullConfig from "../config/config";
import { Upload } from "../models/upload";

const MAX_UPLOAD_MB = 10;

let storage = new Storage();

if (fullConfig.googleSvcAcctKey !== "") {
  storage = new Storage({ keyFilename: fullConfig.googleSvcAcctKey });
}

const storageBucketName = fullConfig.storageBucketName;

const UploadRequestQuerySchema = z.object({
  originalFileName: z.string(),
  base64File: z.string().refine((val) => {
    return getOriginalByteSizeFromBase64(val) < MAX_UPLOAD_MB * 1024 * 1024;
  }, "File size too large"),
});

class UploadController {
  async upload(req: express.Request, res: express.Response) {
    try {
      const input = UploadRequestQuerySchema.parse(req.body);

      const buffer = Buffer.from(input.base64File, "base64");
      const fileType = await FileType.fromBuffer(buffer);
      const mimeTypeFromExt = mime.lookup(input.originalFileName);

      if (!fileType) {
        throw new BadRequestError(
          "Invalid file: no mime type detected",
        );
      }

      if (!mimeTypeFromExt) {
        throw new BadRequestError("Invalid file: missing extension");
      }

      if (mimeTypeFromExt !== fileType.mime) {
        throw new BadRequestError(
          "Invalid file: mismatched type and extension",
        );
      }

      //Define bucket.
      const uploadBucket = storage.bucket(storageBucketName);
      //Define file & file name.
      const newFileName = makeRandomName();
      const file = uploadBucket.file(newFileName);

      try {
        await file.save(buffer, { contentType: mimeTypeFromExt });
      } catch (err) {
        console.log(
          "Error during file upload: " +
          (err instanceof Error ? err.message : "unknown"),
        );
        throw new Error("Failed to upload file");
      }

      const uploadRecord = {
        userId: req.user.id,
        originalFilename: input.originalFileName,
        filename: newFileName,
      };
      await Upload.create(uploadRecord);

      return res.status(StatusCodes.OK).json({
        message: "You have successfully uploaded the file",
        payload: {
          originalFileName: input.originalFileName,
          fileName: newFileName,
          url: `https://storage.googleapis.com/${storageBucketName}/${newFileName}`,
        },
      });
    } catch (error) {
      if (
        error instanceof z.ZodError ||
        error instanceof BadRequestError
      ) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: error.message });
      }
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message:
          error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async download(req: express.Request, res: express.Response) {
    let filename: string;
    // the below checks for file ID & user ID authorization
    const upload = await Upload.findOne({
        where: {
          id: req.params.uploadId,
          userId: req.user.id,
        }
    })
    if (upload) {
      filename = upload.filename;
    } else {
      const result = {"status": "failure", "message": "File ID does not exist"};
      return res.end(JSON.stringify(result));
    }

    const fileStream = storage.bucket(storageBucketName)
      .file(filename)
      .createReadStream();

    const base64Content = await streamToString(fileStream)
    const result = {"status": "success", "message": "", "payload": base64Content};
    return res.end(JSON.stringify(result));
  }
}

function makeRandomName(): string {
  let result             = '';
  const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = 29;
  for ( let i = 0; i < charactersLength; i++ ) {
    if (i % 5 === 4) {
      result += "-";
    } else {
      result += characters.charAt(crypto.randomInt(0, characters.length));
    }
 }
 return result;
}

async function streamToString (stream: Readable) {
  const chunks: Uint8Array[] = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk: Uint8Array) => chunks.push(Buffer.from(chunk)));
    stream.on('error', (err) => reject(err));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('base64')));
  })
}

function getOriginalByteSizeFromBase64(base64Str: string) {
  const numPaddingChars = (base64Str.match(/=/g) ?? []).length;
  return (base64Str.length * 3) / 4 - numPaddingChars;
}

export default new UploadController();
