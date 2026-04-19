const router = require("express").Router();
const verifyToken = require("../middleware/authMiddleware");
const { addMeasurement, getMeasurementsByTailor } = require("../controllers/measurementController");

router.post("/", verifyToken, addMeasurement);
router.get("/tailor/:tailorId", verifyToken, getMeasurementsByTailor);

module.exports = router;
