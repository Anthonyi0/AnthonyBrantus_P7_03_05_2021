// importation des plugins
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const conversationController = require("../controllers/conversation");

router.get("/", auth, conversationController.listConversations);
router.get("/:id", auth, conversationController.showConversation);
router.delete("/:id", auth, conversationController.deleteConversation);
router.post("/", auth, conversationController.createConversation);

module.exports = router;