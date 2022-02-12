const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const router = express.Router();
const { isAunthenticatedUser, authorizeRoles } = require("../middleware/auth");

// Place an order
router.route("/order/new").post(isAunthenticatedUser, newOrder);

// View all user's order
router.route("/orders/:id").get(isAunthenticatedUser, getSingleOrder);

// View my orders
router.route("/order/me").get(isAunthenticatedUser, myOrders);

router
  .route("/admin/orders")
  .get(isAunthenticatedUser, authorizeRoles("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAunthenticatedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAunthenticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;
