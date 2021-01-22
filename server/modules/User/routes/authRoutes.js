import express from "express";
import {signup_post ,login_post,logout_get } from "../Controllers/authController.js";
const router = express.Router();


router.post('/signup', signup_post);
router.post('/login',login_post);
router.get('/logout', logout_get);

export default router;