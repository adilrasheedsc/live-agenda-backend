
import express from "express";

import {
  getPublicHalls,
  getPublicTracks,
  getPublicFaculties,
  getPublicScheduleDates,
  getPublicSchedule,
  getPublicSessions,
  getPublicSessionById,
  getPublicTopics,
  getPublicTopicById,
} from "../controllers/publicController.js";

const router = express.Router();

// ==========================================
// PUBLIC HALLS
// ==========================================

router.get("/halls", getPublicHalls);

// ==========================================
// PUBLIC TRACKS
// ==========================================

router.get("/tracks", getPublicTracks);

// ==========================================
// PUBLIC FACULTIES
// ==========================================

router.get("/faculties", getPublicFaculties);

// ==========================================
// PUBLIC SCHEDULE
// Keep specific routes before dynamic routes
// ==========================================

router.get("/dates", getPublicScheduleDates);

router.get("/schedule", getPublicSchedule);

// ==========================================
// PUBLIC SESSIONS
// ==========================================

router.get("/sessions", getPublicSessions);

router.get("/sessions/:id", getPublicSessionById);

// ==========================================
// PUBLIC TOPICS
// ==========================================

router.get("/topics", getPublicTopics);

router.get("/topics/:id", getPublicTopicById);

export default router;
