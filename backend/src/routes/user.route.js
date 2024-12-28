import Router from "express";
import { registerUser, loginUser, logoutUser, refreshAccessToken } from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { isLoggedIn } from "../middleware/auth.middleware.js"; // Adjust the path
const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.get("/check-login", isLoggedIn);


router.get("/check-login", isLoggedIn);
export default router;