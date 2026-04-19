const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (username, email, password, role) VALUES ($1,$2,$3,$4) RETURNING *",
      [username, email, hashedPassword, role]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Registration failed" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = result.rows[0];

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // JWT token creation
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      "mysecretkey",
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Login failed" });
  }
};

exports.getTailors = async (req, res) => {
  try {
    const result = await pool.query("SELECT id, username as name, email FROM users WHERE role='tailor'");
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to load tailors" });
  }
};

exports.getCustomers = async (req, res) => {
  try {
    const result = await pool.query("SELECT id, username as name, email FROM users WHERE role='customer'");
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to load customers" });
  }
};