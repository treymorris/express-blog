import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleSubmit = () => {
    //e.preventDefault();

    fetch("/api/users/login", {
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
        localStorage.setItem("token", data.token);
        localStorage.setItem("userid", data.userid);
          setUser(data.userid)
          navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

   const handleKeyboard = (e) => {
     if (e.key === "Enter") handleSubmit();
   };

  return (
    <div>
      <h1 className="text-light text-center">Login</h1>
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
            onKeyDown={handleKeyboard}
          />
        </div>
        <div className="mb-3 w-50 mx-auto">
          <label htmlFor="password" className="form-label text-light">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyboard}
          />
        </div>
        <div className="d-flex mb-5">
          <button
            type="button"
            className="btn btn-primary mx-auto"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
