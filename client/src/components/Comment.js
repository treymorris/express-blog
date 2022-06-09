const { DateTime } = require("luxon");

function Comment({
  comment,
  author,
  date,
  user,
  handleEditComment,
  handleDeleteComment,
}) {
  return (
    <div className="card bg-secondary border border-primary mb-1">
      <div className="card-body">
        <p className="text-dark mt-3">{comment}</p>
        <p className="text-light mb-0">{author}</p>
        <p>{DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_MED)}</p>
        <button
          onClick={handleEditComment}
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
