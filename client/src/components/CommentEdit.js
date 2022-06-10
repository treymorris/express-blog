import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function CommentEdit({ fetchBlogs }) {
  const { state } = useLocation();
  const [comment, setComment] = useState();
  let navigate = useNavigate();
  useEffect(() => {
    fetchComment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchComment = async () => {
    const data = await fetch(`api/comments/${state.id}`);
    const comment = await data.json();
    setComment(comment.comment);
  };

  // const handleSubmitEdit = async () => {
  //   try {
  //     const response = await fetch(`/api/comments/${state.id}/edit`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //       body: JSON.stringify({
  //         comment: comment.comment,

  //         author: comment.author._id,
  //         blog: comment.blog,
  //       }),
  //     });
  //     const data = await response.json();
  //     console.log("Success on fetch:", data);
  //     //handleFormReset();
  //     fetchBlogs();
  //   } catch (error) {
  //     console.log("Error:", error);
  //   }
  // };

  const handleSubmitEdit = () => {
    fetch(`/api/comments/${state.id}/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        //add authorization header with 'bearer' + token here
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        comment: comment.comment,

        author: comment.author._id,
        blog: comment.blog,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        fetchBlogs();
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComment((prevInfo) => {
      return { ...prevInfo, [name]: value };
    });
  };

  if (comment === undefined) {
    return <>Still Loading...</>;
  }
  return (
    <div>
      <h1 className="text-light">Hello Comment Edit</h1>
      <form onSubmit={handleSubmitEdit}>
        <textarea
          value={comment.comment || ""}
          name="comment"
          className="form-control"
          id="commentText"
          placeholder="Add Comment Here..."
          onChange={handleChange}
        ></textarea>
        <div className="d-flex justify-content-center mb-5">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              handleSubmitEdit();
              navigate("/");
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default CommentEdit;
