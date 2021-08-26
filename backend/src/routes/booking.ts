import { Router } from "express";
import BookingController from "../controllers/booking";

const router = Router();

router.post("/booking", BookingController.create);

export default router;
