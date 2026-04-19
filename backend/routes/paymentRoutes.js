const router = require("express").Router();
const {
  createPayment,
  getPaymentsByCustomer
} = require("../controllers/paymentController");

router.post("/", createPayment);
router.get("/customer/:customerId", getPaymentsByCustomer);

module.exports = router;