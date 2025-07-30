import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const allPosts = [
  {
    id: 1,
    title: "First Blog",
    author: "Partha",
    content: "আবার আসিব ফিরে ধানসিড়ির তীরে — এই বাংলায়..হয়তো মানুষ নয় ,হয়তো বা শঙ্খচিল শালিকের বেশে;হয়তো ভোরের কাক হয়ে এই কার্তিকের নবান্নের দেশে||(জীবনানন্দ দাশ)",
    comments: [
      { id: 1, author: "Dip", text: "sera!" },
      { id: 2, author: "sakin", text: "Ekdom Baje!" },
    ],
  },
  {
    id: 2,
    title: "Second Blog",
    author: "Emon",
    content: "This is the second post",
    comments: [{ id: 3, author: "Esteak", text: "Sundor Mama" }],
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
    comments: [{ id: 4, author: "Mahir", text: "valo hoise" }],
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
  { id: "dislike", emoji: "👎" },
];

function Home() {
  const [postReactions, setPostReactions] = useState({});
  const [commentReactions, setCommentReactions] = useState({});
  const [replies, setReplies] = useState({});
  const [replyInputs, setReplyInputs] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 2;
  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handleReaction = (targetId, reactionId, state, setState) => {
    setState((prev) => {
      const current = prev[targetId];
      const newReactions = { ...prev };

      if (current?.type === reactionId) {
        delete newReactions[targetId]; 
      } else {
        newReactions[targetId] = { type: reactionId };
      }

      return newReactions;
    });
  };

  const handleReplyChange = (key, value) => {
    setReplyInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handleReplySubmit = (key) => {
    if (!replyInputs[key]) return;
    setReplies((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), replyInputs[key]],
    }));
    setReplyInputs((prev) => ({ ...prev, [key]: "" }));
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

          <div className="reactions">
            {reactions.map(({ id, emoji }) => {
              const active = postReactions[post.id]?.type === id;
              return (
                <button
                  key={id}
                  onClick={() =>
                    handleReaction(post.id, id, postReactions, setPostReactions)
                  }
                  className={`reaction-btn ${active ? "active" : ""}`}
                >
                  <span className="reaction-icon">{emoji}</span>
                  <span className="reaction-label">{id}</span>
                </button>
              );
            })}
          </div>

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
                      const active = commentReactions[key]?.type === id;
                      return (
                        <button
                          key={id}
                          onClick={() =>
                            handleReaction(
                              key,
                              id,
                              commentReactions,
                              setCommentReactions
                            )
                          }
                          className={`reaction-btn ${
                            active ? "comment-active" : ""
                          }`}
                        >
                          <span className="reaction-icon">{emoji}</span>
                          <span className="reaction-label">{id}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="reply-section">
                    {(replies[key] || []).map((reply, index) => (
                      <div className="reply" key={index}>
                        <b>You:</b> {reply}
                      </div>
                    ))}
                    <input
                      className="reply-input"
                      placeholder="Write a reply..."
                      value={replyInputs[key] || ""}
                      onChange={(e) => handleReplyChange(key, e.target.value)}
                    />
                    <button
                      className="reply-btn"
                      onClick={() => handleReplySubmit(key)}
                    >
                      Reply
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

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
