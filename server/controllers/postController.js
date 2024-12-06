const Post = require("../models/post.js");
const User = require("../models/User.js");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


const sendMessage = async (req, res)=>{
    console.log("SENDING STUFF");
    // Get token from request headers
    const token = req.headers.authorization?.split(" ")[1];
    if (token === null || token === "")
        return res.status(401).json({message: "Unauthorized. No token provided."});
    
    try{
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
    
        // Find user by ID (excluding the password field)
        const user = await User.findById(userId).select("-password");
    
        if (!user)
            return res.status(404).json({message: "Invalid user. Please try again"});
        else{
            try{
                if(req.body.text === ""){
                    console.log("there is no content");
                    res.status(401).json({message:"Cannot post if there is no content"});
                }
                else{
                    console.log("message should be sent");
                    await Post.create({poster_id:req.body.creator, content:req.body.text, likes:[], posted_date:req.body.time});
                    var obj = JSON.parse(JSON.stringify(await Post.find({poster_id:req.body.creator, content:req.body.text, posted_date:req.body.time})))[0];
                    res.status(200).json({id:obj._id});
                }
            }
            catch(error){
                console.log("message could not be sent");
                console.log(req.body);
                res.status(406).json({message:"Cannot send post. Please try again"});
            }
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"The server is not working currently. Please try again later"});
    }

};

const postLike = async (req, res)=>{
    // Get token from request headers
    const token = req.headers.authorization?.split(" ")[1];

    if (token === null || token === "") 
        return res.status(401).json({message: "Unauthorized. No token provided."});
    
    try{
         // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
    
        // Find user by ID (excluding the password field)
        const user = await User.findById(userId).select("-password");
    
        if (!user)
            return res.status(404).json({message: "Invalid user. Please try again"});
        else{
            try{
                var post = await Post.find({_id:new mongoose.Types.ObjectId(req.body.id)});
                post = JSON.parse(JSON.stringify(post))[0];
                var add = true;
                for(let i = 0; post.likes !== undefined && i < post.likes.length; i++)
                    if(req.body.userName === post.likes[i] || req.body.userName === post.poster_id){
                        add = false;
                        break;
                    }
                if(add && req.body.userName !== post.poster_id)
                    post.likes.push(req.body.userName);
                else if(!add && req.body.userName !== post.poster_id){
                    post.likes.splice(post.likes.indexOf(req.body.userId), 1);
                }
                await Post.findByIdAndUpdate(post._id, post);
                res.status(200).json({likeCount:post.likes.length});
            }
            catch(error){
                console.log(error);
                res.status(406).json({message:"Cannot update post like count. Please try again"});
            }
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"The server is not working currently. Please try again later"});
    }

};

const deletePost = async(req, res)=>{
    // Get token from request headers
    const token = req.headers.authorization?.split(" ")[1];

    if (token === null || token === "")
        return res.status(401).json({message: "Unauthorized. No token provided."});

    try{
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // Find user by ID (excluding the password field)
        const user = await User.findById(userId).select("-password");

        if (!user)
            return res.status(404).json({message: "Invalid user. Please try again"});
        else{
            try{
                var post = await Post.find({_id:new mongoose.Types.ObjectId(req.body.id)});
                post = JSON.parse(JSON.stringify(post))[0];
                if(post.poster_id === req.body.userName){
                    await Post.findByIdAndDelete(post._id);
                    res.sendStatus(200);
                }
                else{
                    console.log("CANNOT DELETE");
                    res.status(403).json({message:"NOT ALLOWED TO DELETE OTHER'S POSTS"});
                }
            }
            catch(error){
                console.log(error);
                res.status(501).json({message:"Cannot delete the post. Please try again"});
            }
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"The server is not working currently. Please try again later"});
    }

};

const getNumber = async (req, res)=>{
    try{
        const postCount = await Post.countDocuments({});
        res.status(200).json({count:postCount});
    }
    catch(error){
        console.log(error);
        res.status(404).json({message:"Cannot find posts. Please try again"});
    }
}

const getPosts = async (req, res)=>{
    try{
        var count = parseInt(req.query.count)
        var postsList = await Post.aggregate([{$sample:{size:count}}]);
        res.status(200).json(postsList);
    }
    catch(error){
        console.log(error);
        res.status(404).json({message:"Cannot find posts. Please try again"});
    }
};

module.exports = {sendMessage, postLike, deletePost, getPosts, getNumber}
