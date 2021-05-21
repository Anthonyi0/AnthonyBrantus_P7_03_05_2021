// importation des plugins
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const forumController = require("../controllers/forum");

router.get("/", auth, forumController.listForum);
router.get("/:id", auth, forumController.showForum);

module.exports = router;