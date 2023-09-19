import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  CreateProductController,
  UpdateProductController,
  braintreePaymentsController,
  braintreeTokenController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  productSearchController,
  productSimilarController,
} from "../controller/ProductController.js";
import formidable from "express-formidable";
import braintree from "braintree";

const router = express.Router();

//Routes

router.post(
  "/create-product",
  requireSignIn,
  formidable(),
  isAdmin,
  CreateProductController
);

router.put(
  "/update-product/:pid",
  requireSignIn,
  formidable(),
  isAdmin,
  UpdateProductController
);

//get product
router.get("/get-product", getProductController);

//single product get
router.get("/get-product/:slug", getSingleProductController);

//get Photo
router.get("/product-photo/:pid", productPhotoController);

//delete product
router.delete("/delete-product/:pid", deleteProductController);
//Filter Products
router.post("/product-filters", productFiltersController);
//product count
router.get("/product-count", productCountController);

// product per page
router.get("/product-list/:page", productListController);

//serach product
router.get("/search/:keyword", productSearchController);
//Similar Product
router.get("/related-product/:pid/:cid", productSimilarController);
//categories Wise product
router.get("/product-category/:slug", productCategoryController);

//Payment Routes Token
router.get("/braintree/token", braintreeTokenController);

//Payments
router.post("/braintree/payment", requireSignIn, braintreePaymentsController); //

//

export default router;
