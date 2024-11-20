import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createRoadmap,
  getRoadmapByUser,
  updateRoadmap,
} from "../controllers/roadmap.controller.js";

const router = express.Router();

// Route to create a new roadmap
router.route("/new").post(isAuthenticated, createRoadmap);

// Route to get roadmaps of a specific user by userId
router.route("/get/:userId").get(isAuthenticated, getRoadmapByUser);

// Route to update an existing roadmap of the logged-in user
router.route("/get/:year/update").put(isAuthenticated, updateRoadmap);

export default router;
