const router = require("express").Router();
const verifyToken = require("../middleware/authMiddleware");

const {
  createOrder,
  getOrders,
  updateStatus,
  getDashboardStats,
  getOrdersByCustomer
} = require("../controllers/orderController");

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/dashboard", getDashboardStats);
router.put("/:id", updateStatus);

// Protected route using JWT
router.get(
  "/customer/:customerId",
  verifyToken,
  getOrdersByCustomer
);

module.exports = router;