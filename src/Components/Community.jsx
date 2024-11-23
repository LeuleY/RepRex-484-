import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../ComponentCSS/Community.css';
import NavBar from './NavBar';
import axios from 'axios';


function Community() {
    //Current community page is temporary, base structure should remain relativly similar but added functionality would need implemented with Mongo later
    const [posts, setPosts] = useState([]); //Ex. Would have to fetch from DB to view posts
    const [newPost, setNewPost] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5001/api/users/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

        if (newPost.trim() !== '') {
            const post = {
                id: Date.now(),
                content: newPost,
                image: imageUrl,
                likes: 0,
                timestamp: new Date().toLocaleString(),
                author: response.data.username
            };
            setPosts([post, ...posts]);
            setNewPost('');
            setImageUrl('');
            await axios.post("http://localhost:5002/posts/create", {
                text:post.content,
                creator:post.author,
                time:post.timestamp
            }).then(res => res.data).catch(error => {console.log(error)});
            
        }
    } catch (error) {
        console.error('Error fetching profile:', error);
    }
    };

    const handleDelete = (postId) => {
        setPosts(posts.filter(post => post.id !== postId));
    };

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
                                    onClick={() => handleLike(post.id)}
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