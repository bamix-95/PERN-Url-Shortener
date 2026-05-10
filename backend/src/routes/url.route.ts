import { Router } from "express";
import {
  createUrl,
  deleteUrl,
  getUrlById,
  getUrls,
  getUrlStats,
} from "../controllers/url.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.use(protect);

router.post("/", createUrl);
router.get("/", getUrls);
router.get("/:id", getUrlById);
router.delete("/:id", deleteUrl);
router.get("/:id/stats", getUrlStats);

export default router;
