import { Router } from "express";
import { isLoggedIn } from "../helpers/auth";
import UserProfileController from "../controllers/userProfile";

const router = Router();

router.get("/user-profile", isLoggedIn, UserProfileController.find);
router.post("/user-profile", isLoggedIn, UserProfileController.create);
router.get(
	"/user-profile/:userProfileId",
	isLoggedIn,
	UserProfileController.get
);
router.put(
	"/user-profile/:userProfileId",
	isLoggedIn,
	UserProfileController.update
);
router.delete(
	"/user-profile/:userProfileId",
	isLoggedIn,
	UserProfileController.destroy
);

export default router;
