//server/routes/postRoutes.js
const express = require('express');
const {sendMessage, postLike, deletePost, getPosts, getNumber} = require('../controllers/postController.js');
const router = express.Router();

router.post("/create", sendMessage);
router.post("/like", postLike);
router.post("/delete", deletePost);
router.get("/number", getNumber)
router.get("/grab", getPosts);
router.get("/", (req, res) => {
    console.log("Successfully routed to posts");
})
module.exports = router;