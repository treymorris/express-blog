import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <div>
      <NavLink
        className="text-primary float-end nav-link"
        to="/"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Bloggy!
      </NavLink>
    </div>
  );
}

export default Footer;
