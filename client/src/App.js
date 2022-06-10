import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SignupForm from "./components/SignupForm";
import Login from "./components/Login";
import BlogForm from "./components/BlogForm";
import Footer from "./components/Footer";
import BlogEdit from "./components/BlogEdit";
import CommentEdit from "./components/CommentEdit";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(undefined);

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const data = await fetch(`api/blogs`);
    const blogs = await data.json();
    setBlogs(blogs.blogs);
  };

  const handleDelete = (id) => {
    fetch(`/api/blogs/${id}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        //add authorization header with 'bearer' + token here
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
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

  const [blog, setBlog] = useState({});

  const handleSubmitEdit = (id) => {
    fetch(`/api/blogs/${id}/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        //add authorization header with 'bearer' + token here
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title: blog.title,
        blog: blog.blog,
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

  const handleSubmitCreate = () => {

    fetch("/api/blogs/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //add authorization header with 'bearer' + token here
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title: blog.title,
        blog: blog.blog,
        published: false,
        author: user,
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

  return (
    <div>
      <Router>
        <header className="sticky-top">
          <Navbar user={user} setUser={setUser} />
        </header>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                blogs={blogs}
                user={user}
                handleDelete={handleDelete}
                fetchBlogs={fetchBlogs}
              />
            }
          />
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route
            path="/create"
            element={
              <BlogForm
                blog={blog}
                setBlog={setBlog}
                handleSubmitCreate={handleSubmitCreate}
              />
            }
          />
          <Route
            path="/:id"
            element={
              <BlogEdit
                blog={blog}
                setBlog={setBlog}
                handleSubmitEdit={handleSubmitEdit}
              />
            }
          />
          <Route
            path="/commentEdit"
            element={<CommentEdit fetchBlogs={fetchBlogs} />}
          />
        </Routes>
        <footer className="fixed-bottom mb-3 me-5">
          <Footer />
        </footer>
      </Router>
    </div>
  );
}

export default App;
