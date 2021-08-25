import { Router } from "express";
import BookingController from "../controllers/booking";

const router = Router();

router.put("/booking", BookingController.create);

export default router;
