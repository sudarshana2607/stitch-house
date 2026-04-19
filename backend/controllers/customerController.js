const pool = require("../config/db");

exports.addCustomer = async (req, res) => {
  try {
    const { tailor_id, name } = req.body;
    const result = await pool.query(
      "INSERT INTO tailor_customers (tailor_id, name) VALUES ($1, $2) RETURNING *",
      [tailor_id, name]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to add customer" });
  }
};

exports.getCustomersByTailor = async (req, res) => {
  try {
    const { tailorId } = req.params;
    const result = await pool.query(
      "SELECT * FROM tailor_customers WHERE tailor_id=$1 ORDER BY id DESC",
      [tailorId]
    );
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch customers" });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM tailor_customers WHERE id=$1", [id]);
    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete customer" });
  }
};
