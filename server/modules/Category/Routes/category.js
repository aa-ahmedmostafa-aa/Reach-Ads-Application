import express from "express";
import isAuthorized from '../../../common/middlewares/isAuthorized.js';
import {
  getCategories,
  createCategory,
  deleteCategory,
  getSingleCategory,
  updateCategory,
} from "../Controllers/category.js";
const router = express.Router();
import {
  CATEGORY_CREATE_CATEGORY,
  CATEGORY_DELETE_CATEGORY,
  CATEGORY_GET_CATEGORIES,
  CATEGORY_GET_CATEGORY,
  CATEGORY_UPDATE_CATEGORY,
} from '../endpoints.js'

router.get("/", isAuthorized(CATEGORY_GET_CATEGORIES), getCategories);
router.post("/addCategory", isAuthorized(CATEGORY_CREATE_CATEGORY), createCategory);
router.delete("/deleteCategory/:id",isAuthorized(CATEGORY_DELETE_CATEGORY), deleteCategory);
router.get("/Category/:id",isAuthorized(CATEGORY_GET_CATEGORY), getSingleCategory);
router.put("/Category/Update/:id",isAuthorized(CATEGORY_UPDATE_CATEGORY), updateCategory);

export default router;
