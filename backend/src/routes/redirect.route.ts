import { Router } from "express";
import { redirectUrl } from "../controllers/url.controller";

const router = Router();

router.get("/:shortCode", redirectUrl);

export default router;
