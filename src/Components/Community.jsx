import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../ComponentCSS/Community.css';
import NavBar from './NavBar';
import axios from 'axios';

async function returnUserName(){
    try{
        const token = localStorage.getItem('token');
        const response = await axios.get("http://localhost:5001/api/users/profile", {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data.username;
    }
    catch(error){
        console.log("ERROR: "+error);
        return null;
    }
}

const COUNT = 4;
function Community(){

    //Current community page is temporary, base structure should remain relativly similar but added functionality would need implemented with Mongo later
    const [posts, setPosts] = useState([]); //Ex. Would have to fetch from DB to view posts
    const [newPost, setNewPost] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [postList, setList] = useState([]);
    useEffect(() => {
        async function fetchData(){
            if(JSON.parse(JSON.stringify(posts)).length < COUNT){
                setList(await axios.get("http://localhost:5002/posts/grab?count="+COUNT).then(res => {return res.data}).catch(error => console.log(error)));
                var list = JSON.parse(JSON.stringify(postList));
                console.log(list.length);
                for(let i = 0; i < list.length && i < COUNT && JSON.parse(JSON.stringify(posts.length)) < COUNT; i++){
                    const post = {
                        id: list[i]._id,
                        content: list[i].content,
                        image: '',
                        likes: list[i].likes.length,
                        timestamp: list[i].posted_date,
                        author: list[i].poster_id
                    };
                    var add = true;
                    for(let j = 0; j < JSON.parse(JSON.stringify(posts)).length; j++){
                        if(JSON.parse(JSON.stringify(posts)).length > 0 && JSON.parse(JSON.stringify(posts))[j].id === post.id){
                            add = false;
                            break;
                        }
                    }
                    if(add)
                        setPosts([post, ...posts]);
                }
            }
        }
        fetchData();


    },[posts, postList]);


    const handleSubmit = async (e) => {
        var list = JSON.parse(JSON.stringify(posts));
        e.preventDefault();

        if (newPost.trim() !== '') {
            const post = {
                id: "",
                content: newPost,
                image: imageUrl,
                likes: 0,
                timestamp: new Date().toLocaleString(),
                author: await returnUserName()
            };
            if(list.length < COUNT)
                setPosts([post, ...posts]);
            else{
                for(let i = 1; i < list.length; i++){
                    list[i-1] = list[i];
                }
                list[list.length-1] = post;
                setPosts(list);
            }
            setNewPost('');
            setImageUrl('');
            await axios.post("http://localhost:5002/posts/create", {
                text:post.content,
                creator:post.author,
                time:post.timestamp
            }).then(res => res.data).catch(error => {console.log(error)});
            
        }
    };

    const handleDelete = (postId) => {
        setPosts(posts.filter(post => post.id !== postId));
    };

    // const handleLike = async(postId) => {
    //      setPosts(await Promise.all(posts.map(async post =>
    //         (post.id === postId ? {...posts, likes: await axios.post("http://localhost:5002/posts/like",{id:postId, userName: await returnUserName()}).then(res => {return res.data.likeCount}).catch(error => {console.log("ERROR: "+error)})} : post)
    //     )));
    //     console.log(posts)
    // };
    const handleLike = (postId) => {
        setPosts(posts.map(post =>
            post.id === postId ? {...post, likes: post.likes + 1} : post
        ));
    };
    //The actual should remain relativly similar, just need to modify some of the authentication.
    //Ex. Only show delete function if the user posted it, only allow likes once per user, etc
    return (
        
        <div className="community-page">
            <NavBar/>


            <main className="community-content">
                {/* Post Creation Form */}
                <div className="post-form-container">
                    <form onSubmit={handleSubmit} className="post-form">
                        <textarea
                            value={newPost}
                            onChange={(e) => setNewPost(e.target.value)}
                            placeholder="Share your fitness journey..."
                            className="post-input"
                        />
                        <input
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="Image URL (optional)"
                            className="image-input"
                        />
                        <button type="submit" className="post-button">Share</button>
                    </form>
                </div>

                {/* Posts Feed */}
                <div className="posts-feed">
                    {posts.map(post => (
                        <div key={post.id} className="post">
                            <div className="post-header">
                                <span className="author">{post.author}</span>
                                <span className="timestamp">{post.timestamp}</span>
                            </div>
                            <p className="post-content">{post.content}</p>
                            {post.image && (
                                <img src={post.image} alt="Post" className="post-image" />
                            )}
                            <div className="post-actions">
                                <button
                                    onClick={() => {handleLike(post.id)}}
                                    className="like-button"
                                >
                                    ❤️ {post.likes}
                                </button>
                                <button
                                    onClick={() => handleDelete(post.id)}
                                    className="delete-button"
                                >
                                    🗑️ Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Community;