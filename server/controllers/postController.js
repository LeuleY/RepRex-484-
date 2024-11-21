const Post = require("../models/post.js");
const express = require("express");
const app = express.Router();

app.post("./create", async (req, res)=>{
    try{
        if(req.body.post === "")
            res.status(401).json({message:"Cannot post if there is no content"});
        else{
            const post = new Post({poster_id:req.body.author, content:req.body.content, likes:[], posted_date:req.body.timestamp});
            await post.save();
            res.sendStatus(200);
        }
    }
    catch(error){
        res.status(501).json({message:"Cannot send post. Please try again"});
    }
});

app.post("./like", async (req, res)=>{
    try{
        var post = await Post.find({_id:req.body.id});
        var add = true;
        for(let i = 0; i < post.likes.length; i++)
            if(req.body.userId === post.likes[i] || req.body.userId === post.poster_id){
                add = false;
                break;
            }
        if(add && req.body.id === post._id)
            post.likes.push(req.body.userId);
        Post.findByIDAndUpdate(post._id, post);
    }
    catch(error){
        res.status(501).json({message:"Cannot update post like count. Please try again"});
    }
});

app.post("./grab", async (req, res)=>{
    try{
        var postsList = [];
        for(let i = 0; i < 10; i++){
            postsList.push(Post.aggregate([{$sample:{size:1}}]));
        }
    }
    catch(error){
        res.status(501).json({message:"Cannot find posts. Please try again"});
    }
});
app.listen(4000);
