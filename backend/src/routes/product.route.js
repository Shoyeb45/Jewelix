import Router from "express";
import { addProduct, getProductOfMaterial, getProductOfCategory, getIndividualProductData } from "../controllers/product.controller.js";
import { upload } from "../middleware/multer.middlware.js";
import multer from "multer";
const router = Router();

router.route("/addProduct").post(upload.array("productImages", 3), addProduct);
router.route("/materials").get(getProductOfMaterial);

router.route("/categories").get(getProductOfCategory);
router.route("/:id").get(getIndividualProductData);


export default router;