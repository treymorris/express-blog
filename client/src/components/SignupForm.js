import { useState } from "react";

function SignupForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((response) => response.json()) //catch token here and save to local storage
      .then((data) => {
        console.log(data);
        localStorage.setItem("user", data.token);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1 className="text-light text-center mb-5">Sign Up/Admin Only!</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 w-50 mx-auto">
          <label htmlFor="username" className="form-label text-light">
            Username
          </label>
          <input
            type="username"
            className="form-control"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3 w-50 mx-auto">
          <label htmlFor="password" className="form-label text-light">
            Admin Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-center mb-5">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
