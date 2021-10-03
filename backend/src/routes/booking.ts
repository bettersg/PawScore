import { Router } from "express";
import { isLoggedIn } from "../helpers/auth";
import BookingController from "../controllers/booking";

const router = Router();

router.post("/booking", isLoggedIn, BookingController.create);

export default router;
