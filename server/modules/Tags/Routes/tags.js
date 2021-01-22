import express from "express";
import isAuthorized from "../../../common/middlewares/isAuthorized.js";
import {
  getTags,
  createTags,
  deleteTags,
  getSingleTag,
  updateSingleTag,
  getTagAds
} from "../Controllers/tags.js";
import {
  TAG_CREATE_TAG,
  TAG_UPDATE_TAG,
  TAG_DELETE_TAG,
  TAG_GET_ADVERTISMENTS_TAG,
  TAG_GET_TAG,
  TAG_GET_TAGS,
}
  from '../endpoint.js' 
const router = express.Router();

router.get("/",isAuthorized(TAG_GET_TAGS), getTags);
router.post("/addTags",isAuthorized(TAG_CREATE_TAG), createTags);
router.delete("/deleteTags/:id",isAuthorized(TAG_DELETE_TAG), deleteTags);
router.get("/Tag/:id", isAuthorized(TAG_GET_TAG),getSingleTag);
router.get("/TagsAds/:id", isAuthorized(TAG_GET_ADVERTISMENTS_TAG), getTagAds);
router.put("/UpdateTag/:id",isAuthorized(TAG_UPDATE_TAG), updateSingleTag);

export default router;
