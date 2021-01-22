import mongoose from "mongoose";
import {adsSchema} from "../Schema/adsSchema.js";

const Ads = mongoose.model("Ads", adsSchema);
export default Ads;
