import express from "express";
import isAuthorized from "../../../common/middlewares/isAuthorized.js";

import {
  getAds,
  createAds,
  deleteAds,
  getAdsCategory,
  getSingleAds,
  UpdateAds,
  getAdsUser,
} from "../Controllers/ads.js";
import {
  ADVERTISMENT_CREATE_AD,
  ADVERTISMENT_DELETE_AD,
  ADVERTISMENT_GET_AD,
  ADVERTISMENT_GET_ADS,
  ADVERTISMENT_GET_ADS_BY_CATEGORY,
  ADVERTISMENT_GET_ADVERTISER_ADS_,
  ADVERTISMENT_UPDATE_AD
}from '../endpoints.js'
const router = express.Router();

router.get("/",isAuthorized(ADVERTISMENT_GET_ADS), getAds);
router.post("/addAds",isAuthorized(ADVERTISMENT_CREATE_AD), createAds);
router.delete("/deleteAds/:id",isAuthorized(ADVERTISMENT_DELETE_AD), deleteAds);
router.get("/AdsCategory/:id",isAuthorized(ADVERTISMENT_GET_ADS_BY_CATEGORY), getAdsCategory);
router.get("/Advertisement/:id",isAuthorized(ADVERTISMENT_GET_AD), getSingleAds);
router.get("/AdvertisementsUser/:id",isAuthorized(ADVERTISMENT_GET_ADVERTISER_ADS_), getAdsUser);
router.put("/Ads/Update/:id",isAuthorized(ADVERTISMENT_UPDATE_AD), UpdateAds);

export default router;
