const pool = require("../config/db");

exports.createPayment = async (req, res) => {
  const { customer_id, order_id, amount, payment_status } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO payments 
       (customer_id, order_id, amount, status)
       VALUES ($1,$2,$3,$4)
       RETURNING *`,
      [customer_id, order_id, amount, payment_status]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Payment failed" });
  }
};

exports.getPaymentsByCustomer = async (req, res) => {
  const { customerId } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM payments WHERE customer_id=$1 ORDER BY id ASC",
      [customerId]
    );

    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch payments" });
  }
};