import { Roadmap } from "../models/roadmap.model.js";
import { User } from "../models/user.model.js";

// Create a new roadmap
export const createRoadmap = async (req, res) => {
  try {
    const { year, title, achievements } = req.body;
    const userId = req.id; // Assuming user ID is set from authentication middleware

    // Check if the necessary fields are provided
    if (!year || !title || !achievements || achievements.length === 0) {
      return res.status(400).json({
        message: "Year, title, and achievements are required.",
        success: false,
      });
    }
    const achievementsArray = achievements
    .split(".")
    .map((ach) => ach.trim())
    .filter((ach) => ach !== "");

    // Step 1: Create a new roadmap
    const roadmap = new Roadmap({
      year,
      title,
      achievements: achievementsArray,
      author: userId,  // Set the userId as the author of the roadmap
    });

    // Step 2: Save the roadmap to the database
    const savedRoadmap = await roadmap.save();

    // Step 3: Optionally, add the roadmap to the user's roadmaps array (optional)
    await User.findByIdAndUpdate(userId, {
      $push: { roadmaps: savedRoadmap._id },  // Push the roadmap's ID to the roadmaps array
    });

    return res.status(201).json({
      message: "Roadmap created successfully.",
      roadmap: savedRoadmap,
      success: true,
    });
  } catch (err) {
    console.error("Error creating roadmap:", err);
    return res.status(500).json({
      message: "Failed to create roadmap.",
      success: false,
    });
  }
};

// Get all roadmaps for a specific user
export const getRoadmapByUser = async (req, res) => {
  try {
    const userId = req.params.userId; // Get userId from URL params

    // Fetch roadmaps by the user and populate author details if needed
    const roadmaps = await Roadmap.find({ author: userId })
      .sort({ year: -1 }) // Sort by year descending
      .populate('author', 'fullname email'); // Populate user details (optional, based on your needs)

    if (!roadmaps || roadmaps.length === 0) {
      return res.status(404).json({
        message: "No roadmaps found for this user.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Roadmaps fetched successfully.",
      roadmaps,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching roadmaps:", error);
    return res.status(500).json({
      message: "Server error while fetching roadmaps.",
      success: false,
    });
  }
};

// Update a user's roadmap
export const updateRoadmap = async (req, res) => {
  try {
    const userId = req.id; // Get user ID from the session
    const { title, year, achievements } = req.body;

    // Check if the necessary fields are provided
    if (!title || !year || !achievements) {
      return res.status(400).json({
        message: "Title, Year, and Achievements are required.",
        success: false,
      });
    }

    // Validate that the year is valid
    if (year < 1900 || year > new Date().getFullYear()) {
      return res.status(400).json({
        message: "Invalid year.",
        success: false,
      });
    }

    // Process achievements (similar to how it is done in createRoadmap)
    const achievementsArray = achievements
      .split(".")
      .map((ach) => ach.trim())
      .filter((ach) => ach !== "");

    // Find the roadmap by the author (user) and year
    const roadmap = await Roadmap.findOne({ author: userId, year });
    if (!roadmap) {
      return res.status(404).json({
        message: "Roadmap for this year not found.",
        success: false,
      });
    }

    // Update the roadmap fields
    roadmap.title = title || roadmap.title;
    roadmap.year = year || roadmap.year;
    roadmap.achievements = achievementsArray || roadmap.achievements;

    // Save the updated roadmap
    const updatedRoadmap = await roadmap.save();

    return res.status(200).json({
      message: "Roadmap updated successfully.",
      roadmap: updatedRoadmap,
      success: true,
    });
  } catch (error) {
    console.error("Error updating roadmap:", error);
    return res.status(500).json({
      message: "Server error while updating roadmap.",
      success: false,
    });
  }
};
