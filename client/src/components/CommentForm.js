import { useState } from "react";

function CommentForm({ blogid, user, fetchBlogs }) {
  

  const [text, setText] = useState("");

  const handleFormReset = () => {
    setText("");
  };

  const handleKeyboard = (e) => {
    if (e.key === "Enter") handleSubmit();
    if (e.key === "Escape") handleFormReset();
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/comments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          comment: text,
          
          author: user,
          blog: blogid,
        }),
      });
      const data = await response.json();
      console.log("Success on fetch:", data);
      handleFormReset();
      fetchBlogs();
      
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      <div className="mb-5">
        <textarea
          name="comment"
          className="form-control"
          //id="commentText"
          placeholder="Add Comment Here..."
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyboard}
          //value={text}
          hidden={user ? false : true}
        ></textarea>
      </div>
    </div>
  );
}

export default CommentForm;
