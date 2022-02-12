const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateRole,
  deleteUser,
} = require("../controllers/userController");
const router = express.Router();
const { isAunthenticatedUser, authorizeRoles } = require("../middleware/auth");

// Create new user
router.route("/register").post(registerUser);

// User login
router.route("/login").post(loginUser);

// Forgot password
router.route("/password/forgot").post(forgotPassword);

// Reset password via link received in mail
router.route("/password/reset/:token").put(resetPassword);

// Logout user
router.route("/logout").get(logout);

// View user details
router.route("/me").get(isAunthenticatedUser, getUserDetails);

// Update password from profile page
router.route("/password/update").put(isAunthenticatedUser, updatePassword);

// Update user profile
router.route("/me/update").put(isAunthenticatedUser, updateProfile);

// View all users (Admin)
router
  .route("/admin/users")
  .get(isAunthenticatedUser, authorizeRoles("admin"), getAllUsers);

// View, Update and Delete single user (Admin)
router
  .route("/admin/user/:id")
  .get(isAunthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .put(isAunthenticatedUser, authorizeRoles("admin"), updateRole)
  .delete(isAunthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
