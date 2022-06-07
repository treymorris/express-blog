import Blog from "./Blog";
//import { useState, useEffect } from "react";

function Home({ blogs, user, handleDelete }) {

    //const [published, setPublished] = useState([]);

    //  useEffect(() => {
    //    setPublished(() => blogs.filter((blog) => blog.published));
    //  }, [blogs]);
    
  return (
    <main>
      <section>
        <div className="container-fluid">
          <p className="text-light mb-5 text-center">
            Welcome to Bloggy! Where elite bloggers blog about all the things
            worth blogging about today.
          </p>
        </div>
      </section>
      <h4 className="text-light text-center mb-3">Blogs!</h4>
      <section className="row p-3 pt-1 w-75 mx-auto">
        {blogs.map((blog) => (
          <div key={blog._id}>
            <Blog blog={blog} user={user} handleDelete={handleDelete} />
          </div>
        ))}
      </section>
    </main>
  );
}

export default Home;
