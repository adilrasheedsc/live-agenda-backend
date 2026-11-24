import express from "express";

import {
  createTopic,
  getAllTopics,
  getAllTopicsWithoutPagination,
  getTopicById,
  updateTopic,
  deleteTopic,
} from "../controllers/topicController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// All Topic APIs require Admin authentication.
router.use(protect);

// ==========================================
// CREATE TOPIC
// ==========================================

router.post("/", createTopic);

// ==========================================
// GET ROUTES
// Keep static routes before /:id
// ==========================================

router.get("/all", getAllTopicsWithoutPagination);

router.get("/", getAllTopics);

router.get("/:id", getTopicById);

// ==========================================
// UPDATE TOPIC
// ==========================================

router.put("/:id", updateTopic);

// ==========================================
// DELETE TOPIC
// ==========================================

router.delete("/:id", deleteTopic);

export default router;