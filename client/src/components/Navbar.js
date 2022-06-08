import { NavLink } from "react-router-dom";

function Navbar({ user, setUser }) {
  const logout = async () => {
    try {
      const response = await fetch("api/users/logout", {
        method: "POST",
      });
      const data = await response.json();
      console.log(data);
      localStorage.removeItem("userid");
      setUser("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="navbar justify-content-center border border-5 border-dark mb-5 bg-secondary">
      <div className="container-fluid">
        <NavLink
          className="p-3 nav-link text-dark display-6"
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Bloggy!
        </NavLink>
        <div className="nav justify-content-end">
          <NavLink
            className="p-3 nav-link text-dark"
            to="/signup"
            hidden={user ? true : false}
          >
            Sign Up
          </NavLink>
          <NavLink
            className="p-3 nav-link text-dark"
            to="/login"
            hidden={user ? true : false}
          >
            Login
          </NavLink>
          <NavLink
            className="p-3 nav-link text-dark"
            to="/create"
            hidden={user ? false : true}
          >
            Create Blog
          </NavLink>
          <NavLink
            className="p-3 nav-link text-dark"
            to="/"
            hidden={user ? false : true}
            onClick={logout}
          >
            Logout
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
