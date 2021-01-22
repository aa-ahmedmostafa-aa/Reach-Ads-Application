import mongoose from "mongoose";
import {tagsSchema} from "../Schema/tagsSchema.js";

const Tags = mongoose.model("Tags", tagsSchema);
export default Tags;
