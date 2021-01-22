import mongoose from "mongoose";

export const tagsSchema = mongoose.Schema({
  name: String,
  adsId: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});
