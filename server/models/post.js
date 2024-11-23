const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
    poster_id:String,
    content:String,
    likes:[Number],
    posted_date:String
});

var Post = mongoose.model('communities', postSchema);
module.exports = Post;