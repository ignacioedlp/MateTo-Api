const express = require("express");
const authRouter = require("./auth.routes");
const healthRouter = require("./health.routes");
const userRouter = require("./user.routes");
const productRouter = require("./product.routes");
const purchaseRouter = require("./purchase.routes");
const profileRouter = require("./profile.routes");
const cartRouter = require("./cart.routes");
const favoriteRouter = require("./favorite.routes");
const commentRouter = require("./comment.routes");
const ratingRouter = require("./rating.routes");
const discountRouter = require("./discount.routes");

const router = express.Router();

const AccessControl = require("../../middlewares/access.middleware");

router.use("/auth", authRouter);
router.use("/health", healthRouter);
router.use("/users", AccessControl.checkTokenValidation, userRouter);
router.use("/products", AccessControl.checkTokenValidation, productRouter);
router.use("/profile", AccessControl.checkTokenValidation, profileRouter);
router.use("/purchases", AccessControl.checkTokenValidation, purchaseRouter);
router.use("/favorites", AccessControl.checkTokenValidation, favoriteRouter);
router.use("/cart", AccessControl.checkTokenValidation, cartRouter);
router.use("/comments", AccessControl.checkTokenValidation, commentRouter);
router.use("/ratings", AccessControl.checkTokenValidation, ratingRouter);
router.use("/discounts", AccessControl.checkTokenValidation, discountRouter);


module.exports = router;