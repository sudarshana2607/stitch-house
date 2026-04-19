const router = require("express").Router();
const {
  sendMessage,
  getMessages,
  getMessagesByUsers
} = require("../controllers/messageController");

router.post("/", sendMessage);
router.get("/", getMessages);
router.get("/:senderId/:receiverId", getMessagesByUsers);

module.exports = router;