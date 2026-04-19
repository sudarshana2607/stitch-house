const router = require("express").Router();
const verifyToken = require("../middleware/authMiddleware");
const { addCustomer, getCustomersByTailor, deleteCustomer } = require("../controllers/customerController");

router.post("/", verifyToken, addCustomer);
router.get("/tailor/:tailorId", verifyToken, getCustomersByTailor);
router.delete("/:id", verifyToken, deleteCustomer);

module.exports = router;
