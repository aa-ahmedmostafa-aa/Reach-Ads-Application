import mongoose from "mongoose";

export const categorySchema = mongoose.Schema({
  name: String,
  description: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});
