const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
    poster_id:Number,
    content:String,
    likes:[Number],
    posted_date:String
});

var Post = mongoose.model("Post", postSchema, 'communities');
module.exports = Post;