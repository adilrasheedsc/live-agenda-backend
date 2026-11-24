<<<<<<< HEAD
import express from "express";

import { getDashboard } from "../controllers/dashboardController.js";
import {protect} from "../middlewares/authMiddleware.js"

const router = express.Router();

router.use(protect);

router.get("/", getDashboard);

=======
import express from "express";

import { getDashboard } from "../controllers/dashboardController.js";
import {protect} from "../middlewares/authMiddleware.js"

const router = express.Router();

router.use(protect);

router.get("/", getDashboard);

>>>>>>> 03fb75b6e84b394e819b60e34eb531efb2e85317
export default router;