import express from "express";
import {
  RegisterController,
  LoginController,
  TestController,
  forgotPasswordController,
  updateProfileController,
  getOrderController,
  getAllOrderController,
  orderStatusController,
} from "../controller/AuthController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", RegisterController);

router.post("/login", LoginController);

router.post("/forgot-password", forgotPasswordController);

router.get("/test", requireSignIn, isAdmin, TestController);

router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//Update Profile
router.put("/profile", requireSignIn, updateProfileController);

//order
router.get("/orders", requireSignIn, getOrderController);

// All Orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrderController);

//Orders Status
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);
export default router;
