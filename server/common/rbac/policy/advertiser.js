import { 
    ADVERTISMENT_CREATE_AD,
    ADVERTISMENT_DELETE_AD,
    ADVERTISMENT_GET_AD,
    ADVERTISMENT_GET_ADS,
    ADVERTISMENT_GET_ADS_BY_CATEGORY, 
    ADVERTISMENT_GET_ADVERTISER_ADS_,
    ADVERTISMENT_UPDATE_AD

    } from '../../../modules/Advertisement/endpoints.js';
import {CATEGORY_GET_CATEGORIES,CATEGORY_GET_CATEGORY } from '../../../modules/Category/endpoints.js';
import { 
    TAG_GET_ADVERTISMENTS_TAG,
    TAG_GET_TAG,
    TAG_GET_TAGS,
 } from '../../../modules/Tags/endpoint.js';
export default [
    ADVERTISMENT_CREATE_AD,
    ADVERTISMENT_DELETE_AD,
    ADVERTISMENT_GET_AD,
    ADVERTISMENT_GET_ADS,
    ADVERTISMENT_GET_ADS_BY_CATEGORY, 
    ADVERTISMENT_GET_ADVERTISER_ADS_,
    ADVERTISMENT_UPDATE_AD,
    TAG_GET_ADVERTISMENTS_TAG,
    TAG_GET_TAG,
    TAG_GET_TAGS,
    CATEGORY_GET_CATEGORIES,CATEGORY_GET_CATEGORY
];