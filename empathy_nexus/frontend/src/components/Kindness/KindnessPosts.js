import React, { useState } from "react";
import './KindnessPosts.css';

function KindnessPosts() {
  // Debugging log to check if the component is loaded
  console.log('KindnessPosts component loaded');

  // Initial posts for testing
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Alice",
      content: "Had a wonderful day helping a friend! 😊 #KindnessMatters",
      image: "https://via.placeholder.com/400x200?text=Kindness+Post", // Placeholder image
      likes: 5,
      comments: ["So proud of you!", "Keep spreading kindness!"],
    },
    {
      id: 2,
      user: "Bob",
      content: "Just donated clothes to a shelter today. 🙌 #GiveBack",
      image: "https://via.placeholder.com/400x200?text=Kindness+Post", // Placeholder image
      likes: 10,
      comments: ["Great job!", "You're amazing!"],
    },
  ]);

  const [newPostContent, setNewPostContent] = useState("");
  const [newPostImage, setNewPostImage] = useState(null);

  const handlePostContentChange = (e) => {
    setNewPostContent(e.target.value);
  };

  const handleImageChange = (e) => {
    setNewPostImage(e.target.files[0]);
  };

  const handleCreatePost = () => {
    const newPost = {
      id: posts.length + 1,
      user: "You",
      content: newPostContent,
      image: newPostImage ? URL.createObjectURL(newPostImage) : "",
      likes: 0,
      comments: [],
    };
    setPosts([newPost, ...posts]);
    setNewPostContent(""); // Clear content input after posting
    setNewPostImage(null); // Clear image input after posting
  };

  return (
    <div className="kindness-posts">
      <header className="header">
        <div className="app-name">KindnessPosts</div>
        <button className="post-btn" onClick={() => document.getElementById('post-input').focus()}>
          Create Post
        </button>
      </header>

      <div className="new-post">
        <textarea
          id="post-input"
          value={newPostContent}
          onChange={handlePostContentChange}
          placeholder="Share a kind act you did today..."
          rows="4"
        ></textarea>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="image-upload"
        />

        {newPostImage && (
          <div className="preview-image">
            <img src={URL.createObjectURL(newPostImage)} alt="Preview" />
          </div>
        )}

        <button className="post-submit" onClick={handleCreatePost}>
          Post
        </button>
      </div>

      <div className="posts-feed">
        {posts.length === 0 ? (
          <p>No posts yet. Be the first to share a kind act!</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post">
              <div className="post-header">
                <div className="post-user">{post.user}</div>
              </div>
              <div className="post-content">{post.content}</div>
              {post.image && <img src={post.image} alt="Post" className="post-image" />}
              <div className="post-footer">
                <button className="like-btn">❤️ {post.likes}</button>
                <div className="comments">
                  {post.comments.map((comment, index) => (
                    <div key={index} className="comment">{comment}</div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default KindnessPosts;
