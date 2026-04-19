const router = require("express").Router();
const {
  register,
  login,
  getTailors,
  getCustomers
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/tailors", getTailors);
router.get("/customers", getCustomers);

module.exports = router;