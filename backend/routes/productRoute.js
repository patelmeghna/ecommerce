const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  creteProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
} = require("../controllers/productController");
const { isAunthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

// Get all products
router.route("/products").get(getAllProducts);

// Get all products -- (Admin)
router.route("/admin/products").get(isAunthenticatedUser, authorizeRoles("admin"), getAdminProducts);

// Create a product
router
  .route("/admin/products/new")
  .post(isAunthenticatedUser, authorizeRoles("admin"), createProduct);

// Edit and Delete Single Product
router
  .route("/admin/product/:id")
  .put(isAunthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAunthenticatedUser, authorizeRoles("admin"), deleteProduct);

// View Single Product
router.route("/product/:id").get(getProductDetails);

// Add review in the product
router.route("/review").put(isAunthenticatedUser, creteProductReview)

// View all reviews and delete review
router.route("/reviews").get(getProductReviews).delete(isAunthenticatedUser, deleteReview);

module.exports = router;
