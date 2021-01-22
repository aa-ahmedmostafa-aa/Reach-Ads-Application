import mongoose from "mongoose";
import {categorySchema} from "../Schema/categorySchema.js";

const Category = mongoose.model("Category", categorySchema);
export default Category;
