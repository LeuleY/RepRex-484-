const Post = require("../models/post.js");
const express = require("express");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors'); // NEW CODE: Import CORS middleware
dotenv.config({ path: 'server/config.env' });

const MONGODB_URI = process.env.ATLAS_URI;

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
  });
const app = express();
app.use(cors());
app.use(express.json());
//app.use(express.urlencoded({extended:false}));
app.post("/posts/create", async (req, res)=>{
    console.log("SENDING STUFF");
    try{
        if(req.body.text === ""){
            console.log("there is no content");
            res.status(401).json({message:"Cannot post if there is no content"});
        }
        else{
            console.log("message should be sent");
            //const post = new Post({poster_id:req.body.author, content:req.body.post, likes:[], posted_date:req.body.timestamp});
            Post.create({poster_id:req.body.creator, content:req.body.text, likes:[], posted_date:req.body.time});
            res.sendStatus(200);
        }
    }
    catch(error){
        console.log("message could not be sent");
        console.log(req.body);
        res.status(406).json({message:"Cannot send post. Please try again"});
    }
});

app.post("/posts/like", async (req, res)=>{
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
        else if(!add && req.body.id === post._id){
            post.likes.splice(post.likes.indexOf(req.body.userId), 1);
        }
        Post.findByIDAndUpdate(post._id, post);
    }
    catch(error){
        res.status(501).json({message:"Cannot update post like count. Please try again"});
    }
});

app.post("/posts/grab", async (req, res)=>{
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
app.listen(5002);
