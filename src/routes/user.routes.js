import {Router} from "express";
import { loginUser, logOutUser, registerUser,getCurrentUser } from "../controller/user.controller.js";

import { verifyJwt } from "../middlewares/auth.middlewares.js";


const router = Router();
router.route('/register').post(
    registerUser
);
router.route('/login').post(
    loginUser
);
router.get("/me", verifyJwt, getCurrentUser);
router.route('/logout').post(
    verifyJwt,
    logOutUser
);


export default router;