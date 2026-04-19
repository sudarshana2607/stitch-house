const pool = require("../config/db");

exports.createOrder = async (req, res) => {
  const { customer_id, dress_type, amount, status } = req.body;

  const result = await pool.query(
    "INSERT INTO orders (customer_id, tailor_id, dress_type, amount, status) VALUES ($1,$2,$3,$4,$5) RETURNING *",
    [req.body.customer_id, req.body.tailor_id, dress_type, amount, status]
  );

  res.json(result.rows[0]);
};

exports.getOrders = async (req, res) => {
  const result = await pool.query(`
    SELECT o.*, u.username as real_customer_name 
    FROM orders o 
    LEFT JOIN users u ON o.customer_id = u.id
  `);
  res.json(result.rows);
};

exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const result = await pool.query(
    "UPDATE orders SET status=$1 WHERE id=$2 RETURNING *",
    [status, id]
  );

  res.json(result.rows[0]);
};

exports.getDashboardStats = async (req, res) => {
  try {
    const { customerId, tailorId } = req.query;
    
    let baseQueryOrders = "SELECT * FROM orders";
    let baseQueryPayments = "SELECT * FROM payments";
    let paramsOrders = [];
    let paramsPayments = [];
    
    if (customerId) {
        baseQueryOrders += " WHERE customer_id=$1";
        baseQueryPayments += " WHERE customer_id=$1";
        paramsOrders.push(customerId);
        paramsPayments.push(customerId);
    } else if (tailorId) {
        baseQueryOrders += " WHERE tailor_id=$1";
        baseQueryPayments += " WHERE order_id IN (SELECT id FROM orders WHERE tailor_id=$1)";
        paramsOrders.push(tailorId);
        paramsPayments.push(tailorId);
    }

    const { rows: orders } = await pool.query(baseQueryOrders, paramsOrders);
    
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'Pending').length;
    
    // Revenue sum logic
    const { rows: payments } = await pool.query(baseQueryPayments, paramsPayments);
    const revenue = payments.reduce((sum, p) => sum + Number(p.amount), 0);

    res.json({
      totalOrders,
      pendingOrders,
      revenue
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getOrdersByCustomer = async (req, res) => {
  const { customerId } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM orders WHERE customer_id=$1 ORDER BY id ASC",
      [customerId]
    );

    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch customer orders" });
  }
};