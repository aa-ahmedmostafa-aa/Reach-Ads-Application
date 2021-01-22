import mongoose from "mongoose";

export const adsSchema = mongoose.Schema({
  title: String,
  type: { type: String, enum: ["free", "paid"] },
  description: String,
  categoryId: String,
  advertiser: String,
  startDate: Date,
  endDate: Date,
  tags: [String],
  photo: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});