import React, { useState } from "react";
import { Link } from "react-router-dom";

const allPosts = [
  {
    id: 1,
    title: "First Post",
    author: "Partha",
    content: "This is the first post",
    comments: [
      { id: 1, author: "Eve", text: "Nice post!" },
      { id: 2, author: "Frank", text: "Thanks for sharing." },
    ],
  },
  {
    id: 2,
    title: "Second Post",
    author: "Emon",
    content: "This is the second post",
    comments: [{ id: 3, author: "Grace", text: "Interesting thoughts." }],
  },
  {
    id: 3,
    title: "Third Post",
    author: "Samia",
    content: "This is the third post",
    comments: [],
  },
  {
    id: 4,
    title: "Fourth Post",
    author: "Rabib",
    content: "This is the fourth post",
    comments: [{ id: 4, author: "Heidi", text: "Loved this one." }],
  },
  {
    id: 5,
    title: "Fifth Post",
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
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f9f9f9", // light gray background
        minHeight: "100vh",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#333",
      }}
    >
      <h1
        style={{
          color: "#2c3e50",
          borderBottom: "2px solid #2980b9",
          paddingBottom: "10px",
        }}
      >
        Blog Posts
      </h1>

      {currentPosts.map((post) => (
        <div
          key={post.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "8px",
            backgroundColor: "white",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ color: "#2980b9" }}>{post.title}</h2>
          <p>{post.content}</p>
          <p>
            Author:{" "}
            <Link
              to={`/author/${post.author}`}
              style={{ color: "#e67e22", fontWeight: "bold" }}
            >
              {post.author}
            </Link>
          </p>

          {/* Post reactions */}
          <div>
            {reactions.map(({ id, emoji }) => {
              const isActive = activeReactions[post.id] === id;
              return (
                <button
                  key={id}
                  onClick={() => handleReactionClick(post.id, id)}
                  style={{
                    fontSize: "20px",
                    marginRight: "8px",
                    cursor: "pointer",
                    backgroundColor: isActive ? "#cce5ff" : "transparent",
                    border: "none",
                    outline: "none",
                  }}
                  aria-label={id}
                >
                  {emoji}
                </button>
              );
            })}
          </div>

          {/* Comments */}
          <div style={{ marginLeft: "20px", marginTop: "10px" }}>
            <h4 style={{ color: "#555" }}>Comments:</h4>
            {post.comments.length === 0 && <p>No comments yet.</p>}
            {post.comments.map((comment) => {
              const key = `${post.id}-${comment.id}`;
              return (
                <div key={comment.id} style={{ marginBottom: "8px" }}>
                  <b>{comment.author}:</b> {comment.text}
                  <div>
                    {reactions.map(({ id, emoji }) => {
                      const isActive = activeCommentReactions[key] === id;
                      return (
                        <button
                          key={id}
                          onClick={() => handleCommentReactionClick(key, id)}
                          style={{
                            fontSize: "18px",
                            marginRight: "5px",
                            backgroundColor: isActive ? "#d4edda" : "transparent",
                            border: "none",
                            cursor: "pointer",
                            outline: "none",
                          }}
                          aria-label={id}
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
      <div style={{ marginTop: "20px" }}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num)}
            style={{
              marginRight: "8px",
              fontWeight: currentPage === num ? "bold" : "normal",
              cursor: "pointer",
              padding: "5px 10px",
              borderRadius: "4px",
              border: "1px solid #2980b9",
              backgroundColor: currentPage === num ? "#2980b9" : "white",
              color: currentPage === num ? "white" : "#2980b9",
            }}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Home;
