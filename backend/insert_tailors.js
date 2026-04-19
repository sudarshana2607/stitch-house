const pool = require('./config/db');
const bcrypt = require('bcrypt');

async function insertTailors() {
  try {
    const defaultPassword = await bcrypt.hash('password123', 10);
    
    // Check if stitchhouse exists
    const res1 = await pool.query("SELECT * FROM users WHERE email='stitch@tailor.com'");
    if (res1.rows.length === 0) {
      await pool.query(
        "INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4)",
        ['Stitchhouse', 'stitch@tailor.com', defaultPassword, 'tailor']
      );
    }
    
    // Check if sri tailor exists
    const res2 = await pool.query("SELECT * FROM users WHERE email='sri@tailor.com'");
    if (res2.rows.length === 0) {
      await pool.query(
        "INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4)",
        ['Sri Tailor', 'sri@tailor.com', defaultPassword, 'tailor']
      );
    }
    
    console.log("Tailors seeded successfully.");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

insertTailors();
