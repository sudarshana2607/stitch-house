const pool = require("../config/db");

exports.sendMessage = async (req, res) => {
  const { sender_id, receiver_id, message } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO messages (sender_id, receiver_id, message) VALUES ($1,$2,$3) RETURNING *",
      [sender_id, receiver_id, message]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to send message" });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM messages ORDER BY id ASC");
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

exports.getMessagesByUsers = async (req, res) => {
  const { senderId, receiverId } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM messages
       WHERE (sender_id=$1 AND receiver_id=$2)
       OR (sender_id=$2 AND receiver_id=$1)
       ORDER BY id ASC`,
      [senderId, receiverId]
    );

    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch user messages" });
  }
};