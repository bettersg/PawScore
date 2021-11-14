import { Router } from "express";
import HealthCheck from "../controllers/healthcheck";

const router = Router();

router.post("/healtcheck", HealthCheck.get);

export default router;
