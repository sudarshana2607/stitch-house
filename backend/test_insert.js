const pool = require('./config/db');

async function testInsert() {
  try {
    const res = await pool.query(
      `INSERT INTO payments 
       (customer_id, order_id, amount, status)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [1, 2, 500, 'Paid']
    );
    console.log("SUCCESS:", res.rows);
  } catch (err) {
    console.log("ERROR details:", err.stack);
  } finally {
    process.exit(0);
  }
}

testInsert();
