import { Router } from "express";
import { isLoggedIn } from "../helpers/auth";
import UploadController from "../controllers/upload";

const router = Router();

router.post("/upload", isLoggedIn, UploadController.upload);

router.get("/upload/:uploadId", isLoggedIn, UploadController.download);

export default router;
