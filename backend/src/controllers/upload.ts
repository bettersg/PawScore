import express from "express";
import { Storage } from "@google-cloud/storage";
import stream from "stream";
import { Readable } from "stream";
import fullConfig from "../config/config";
import crypto from "crypto";
import { Upload } from "../models/upload";

let storage = new Storage();

if (fullConfig.googleSvcAcctKey !== "") {
  storage = new Storage({keyFilename: fullConfig.googleSvcAcctKey});
}

const storageBucketName = fullConfig.storageBucketName

class UploadController {
  async upload(req: express.Request, res: express.Response) {
    // check first before proceeding
    if (req.body.originalFilename === undefined || req.body.originalFilename === "") {
      const result = {"status": "failure", "message": "Invalid original filename"};
      return res.end(JSON.stringify(result));
    }

    const MAX_UPLOAD_MB = 10;
    if (req.body.base64File.length / 4 * 3 > MAX_UPLOAD_MB * 1024 * 1024) {
      const result = {"status": "failure", "message": "File size too large"};
      return res.end(JSON.stringify(result));
    }

    const bufferStream = new stream.PassThrough();
    bufferStream.end(Buffer.from(req.body.base64File, 'base64'));

    //Define bucket.
    const myBucket = storage.bucket(storageBucketName);
    //Define file & file name.
    const newFileName = makeRandomName();
    const file = myBucket.file(newFileName);
    //Pipe the 'bufferStream' into a 'file.createWriteStream' method.
    bufferStream.pipe(file.createWriteStream())
      .on('error', function(err) {
        console.log("Error during file upload: " + err.toString())
        console.log(err);
        const result = {"status": "failure", "message": "Failed to upload file"};
        return res.end(JSON.stringify(result));
      })
      .on('finish', function() {
        // create object in database
        const data = {
          userId: req.user.id,
          originalFilename: req.body.originalFilename,
          filename: newFileName,
        };
        Upload.create(data).then((newUpload: Upload) => {
          if (!newUpload) {
            const result = {"status": "failure", "message": "Failed to create upload reference"};
            return res.end(JSON.stringify(result));
          }
          if (newUpload) {
            const result = {"status": "success", "message": "You have successfully uploaded the file", "payload": newUpload};
            return res.end(JSON.stringify(result));
          }
        });
      });
  }

  async download(req: express.Request, res: express.Response) {
    let filename: string;
    // the below checks for file ID & user ID authorization
    await Upload.findOne({
        where: {
          id: req.params.uploadId,
          userId: req.user.id,
        }
      }).then((foundUpload: Upload) => {
        if (foundUpload) {
          filename = foundUpload.filename;
        } else {
          const result = {"status": "failure", "message": "File ID does not exist"};
          return res.end(JSON.stringify(result));
        }
      });

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

export default new UploadController();
