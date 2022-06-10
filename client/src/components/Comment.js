import { useNavigate } from "react-router-dom";
const { DateTime } = require("luxon");

function Comment({ comment, user, handleDeleteComment }) {

  let navigate = useNavigate();
  const handleEditComment = () => {
    navigate("/commentEdit", {
      state: { id: comment._id }
    });
  };

  return (
    <div className="card bg-secondary border border-primary mb-1">
      <div className="card-body">
        <p className="text-dark mt-3">{comment.comment}</p>
        <p className="text-light mb-0">{comment.author.username}</p>
        <p>{DateTime.fromISO(comment.date).toLocaleString(DateTime.DATETIME_MED)}</p>
        <button
          onClick={() => handleEditComment(comment._id)}
          className="btn btn-warning btn-sm me-2"
          hidden={user ? false : true}
        >
          Edit
        </button>
        <button
          onClick={() => handleDeleteComment(comment._id)}
          className="btn btn-danger float-end btn-sm"
          hidden={user ? false : true}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Comment;
