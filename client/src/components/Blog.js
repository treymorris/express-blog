import React, { useState, useEffect } from 'react';


function Blog() {

    useEffect(() => {
        fetchItems();
    }, []);

    const [blogs, setBlogs] = useState([]);

    const fetchItems = async () => {

        const data = await fetch('/api/blogs');

        const blogs = await data.json();

        console.log(blogs);
        setBlogs(blogs);
    };


    return (
        
        <div>
            {blogs.map(blog => (
            <div className="card" key={blog._id}>
                <img src="" className="card-img-top" alt="" />
                <div className="card-body">
                    <h5 className="card-title text-dark">{blog.title}</h5>
                    <p className="card-text">{blog.blog}</p>
                    <p>{blog.date}</p>
                    <a href="www" className="link-warning">Edit</a>
                </div>
            </div>
            ))}
             
       </div>
    
  );
}

export default Blog;