import mongoose from 'mongoose';

const roadmapSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: new Date().getFullYear(),
  },
  title: {
    type: String,
    required: true,
    unique: false, // No need to be unique as multiple users can have the same title
  },
  achievements: [
    {
      type: String,
      required: true, // Each achievement should be a string
    },
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // Reference to User model
  },
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps

// Index to quickly fetch a user's roadmap based on the year
roadmapSchema.index({ year: 1, author: 1 });

export const Roadmap = mongoose.model('Roadmap', roadmapSchema);
