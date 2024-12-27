import Router from "express";
import { addProduct } from "../controllers/product.controller.js";
import { upload } from "../middleware/multer.middlware.js";
import multer from "multer";
const router = Router();

router.route("/addProduct").post(upload.array("productImages", 3), addProduct);
export default router;