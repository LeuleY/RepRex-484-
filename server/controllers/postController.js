const Post = require("../models/post.js");
const Workout = require("../models/Workouts.js");
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
        var post = await Post.find({_id:new mongoose.Types.ObjectId(req.body.id)});
        //var post = await Post.find({_id:new mongoose.Types.ObjectId("6742877aa3def529ff1d5b55")});
        post = JSON.parse(JSON.stringify(post))[0];
        console.log(req.body.userName);
        var add = true;
        for(let i = 0; post.likes !== undefined && i < post.likes.length; i++)
            if(req.body.userName === post.likes[i] || req.body.userName === post.poster_id){
                add = false;
                break;
            }
        //add = true;
        if(add && req.body.UserName !== post.poster_id)
            post.likes.push(req.body.userName);
        else if(!add && req.body.UserName !== post.poster_id){
            post.likes.splice(post.likes.indexOf(req.body.userId), 1);
        }
        console.log(post.likes);
        await Post.findByIdAndUpdate(post._id, post);
        res.status(200).json({likeCount:post.likes.length});
    }
    catch(error){
        console.log(error);
        res.status(406).json({message:"Cannot update post like count. Please try again"});
    }
});

app.post("/posts/delete", async(req, res)=>{

});



app.get("/posts/grab", async (req, res)=>{
    try{
        var count = parseInt(req.query.count)
        var postsList = await Post.aggregate([{$sample:{size:count}}]);
        res.status(200).json(postsList);
    }
    catch(error){
        console.log(error);
        res.status(404).json({message:"Cannot find posts. Please try again"});
    }
});

app.get("chartData/grab", async (req, res) => {

});
app.listen(5002);
