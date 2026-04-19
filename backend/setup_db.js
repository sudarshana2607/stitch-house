const pool = require('./config/db');

async function createTables() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tailor_customers (
        id SERIAL PRIMARY KEY,
        tailor_id INT NOT NULL,
        name VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS measurements (
        id SERIAL PRIMARY KEY,
        tailor_id INT NOT NULL,
        customer_name VARCHAR(100) NOT NULL,
        measurements_data JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Added tailor_id to orders table if it doesn't exist
    await pool.query(`
      ALTER TABLE orders ADD COLUMN IF NOT EXISTS tailor_id INT;
    `);

    console.log("Database tables created/updated successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error creating tables:", error);
    process.exit(1);
  }
}

createTables();
