const pool = require("../config/db");

exports.addMeasurement = async (req, res) => {
  try {
    const { tailor_id, customer_name, measurements_data } = req.body;
    const result = await pool.query(
      "INSERT INTO measurements (tailor_id, customer_name, measurements_data) VALUES ($1, $2, $3) RETURNING *",
      [tailor_id, customer_name, measurements_data]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to add measurement" });
  }
};

exports.getMeasurementsByTailor = async (req, res) => {
  try {
    const { tailorId } = req.params;
    const result = await pool.query(
      "SELECT * FROM measurements WHERE tailor_id=$1 ORDER BY id DESC",
      [tailorId]
    );
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch measurements" });
  }
};
