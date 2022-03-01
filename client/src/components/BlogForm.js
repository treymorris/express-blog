import { useState, } from 'react';



function BlogForm(props) {

  const [blogData, setBlogData] = useState({
    title: props.title || '',
    content: props.content || '',
    comments: props.commments || [],
    published: props.published || true,
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = blogData;

    fetch('/api/blogs/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
    return (
      <div>
        <h1 className="text-light mb-3">Create a new Blog!</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label for="title" className="form-label text-light">Title</label>
              <input type="text" className="form-control" id="blogTitle" placeholder="" onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label for="text" className="form-label text-light">Blog It!</label>
              <textarea name='content' className="form-control" id="blogText" rows="3" onChange={handleChange}></textarea>
            </div>
            <div>
                <button type="button" className="btn btn-primary" onClick={handleSubmit} >Submit</button>
            </div>
          </form>
      </div>
   
  );
}

export default BlogForm;