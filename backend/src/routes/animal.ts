import { Router } from "express";
import AnimalController from "../controllers/animal";

const router = Router();

router.get("/animal", AnimalController.getAll);

export default router;
