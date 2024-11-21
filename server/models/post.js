const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
    poster_id:Number,
    content:String,
    likes:[Number],
    posted_date:Number
});

var Post = mongoose.model("community", postSchema);
module.exports = Post;