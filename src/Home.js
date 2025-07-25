import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // ✅ Import CSS

const allPosts = [
  {
    id: 1,
    title: "First Blog",
    author: "Partha",
    content: "This is the first post",
    comments: [
      { id: 1, author: "Eve", text: "Nice post!" },
      { id: 2, author: "Frank", text: "Thanks for sharing." },
    ],
  },
  {
    id: 2,
    title: "Second Blog",
    author: "Emon",
    content: "This is the second post",
    comments: [{ id: 3, author: "Grace", text: "Interesting thoughts." }],
  },
  {
    id: 3,
    title: "Third Blog",
    author: "Samia",
    content: "This is the third post",
    comments: [],
  },
  {
    id: 4,
    title: "Fourth Blog",
    author: "Rabib",
    content: "This is the fourth post",
    comments: [{ id: 4, author: "Heidi", text: "Loved this one." }],
  },
  {
    id: 5,
    title: "Fifth Blog",
    author: "Rakey",
    content: "This is the fifth post",
    comments: [],
  },
];

const reactions = [
  { id: "like", emoji: "👍" },
  { id: "love", emoji: "❤️" },
  { id: "laugh", emoji: "😂" },
];

function Home() {
  const [activeReactions, setActiveReactions] = useState({});
  const [activeCommentReactions, setActiveCommentReactions] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 2;
  const totalPages = Math.ceil(allPosts.length / postsPerPage);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handleReactionClick = (postId, reactionId) => {
    setActiveReactions((prev) => ({
      ...prev,
      [postId]: prev[postId] === reactionId ? null : reactionId,
    }));
  };

  const handleCommentReactionClick = (key, reactionId) => {
    setActiveCommentReactions((prev) => ({
      ...prev,
      [key]: prev[key] === reactionId ? null : reactionId,
    }));
  };

  return (
    <div className="home-container">
      <h1 className="home-title">📖 Blog Posts</h1>

      {currentPosts.map((post) => (
        <div className="post-card" key={post.id}>
          <h2 className="post-title">{post.title}</h2>
          <p className="post-content">{post.content}</p>
          <p>
            <strong>Author:</strong>{" "}
            <Link to={`/author/${post.author}`} className="author-link">
              {post.author}
            </Link>
          </p>

          {/* Post reactions */}
          <div className="reactions">
            {reactions.map(({ id, emoji }) => {
              const isActive = activeReactions[post.id] === id;
              return (
                <button
                  key={id}
                  onClick={() => handleReactionClick(post.id, id)}
                  className={`reaction-btn ${isActive ? "active" : ""}`}
                >
                  {emoji}
                </button>
              );
            })}
          </div>

          {/* Comments */}
          <div className="comments-section">
            <h4>💬 Comments:</h4>
            {post.comments.length === 0 && <p>No comments yet.</p>}
            {post.comments.map((comment) => {
              const key = `${post.id}-${comment.id}`;
              return (
                <div key={comment.id} className="comment-card">
                  <b>{comment.author}:</b> {comment.text}
                  <div className="comment-reactions">
                    {reactions.map(({ id, emoji }) => {
                      const isActive = activeCommentReactions[key] === id;
                      return (
                        <button
                          key={id}
                          onClick={() =>
                            handleCommentReactionClick(key, id)
                          }
                          className={`reaction-btn ${
                            isActive ? "comment-active" : ""
                          }`}
                        >
                          {emoji}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num)}
            className={`page-btn ${currentPage === num ? "active-page" : ""}`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Home;
