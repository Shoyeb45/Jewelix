import Router from "express";
import { addProduct, getProductOfMaterial, getProductOfCategory } from "../controllers/product.controller.js";
import { upload } from "../middleware/multer.middlware.js";
import multer from "multer";
const router = Router();

router.route("/addProduct").post(upload.array("productImages", 3), addProduct);
router.route("/getProductOfMaterial").get(getProductOfMaterial);
router.route("/getProductOfCategory").get(getProductOfCategory);
export default router;