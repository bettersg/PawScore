import { Router } from "express";
import UploadController from "../controllers/upload";

const router = Router();

router.post("/upload", UploadController.upload);

router.get("/upload/:uploadId", UploadController.download);

export default router;
