

function Comment({ user, blogid, authorid}) {
  return (
    <div>
      <h6 className="text-light ms-3" hidden={user ? false : true}>
        Comments
      </h6>
    </div>
  );
}

export default Comment;
