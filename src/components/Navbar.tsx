import { Link } from "react-router-dom";

const Navbar = () => (
  <nav style={{ padding: "1rem", backgroundColor: "#f4f4f4" }}>
    <Link to="/" style={{ margin: "0 1rem" }}>Home</Link>
    <Link to="/about" style={{ margin: "0 1rem" }}>About</Link>
    <Link to="/blogs" style={{ margin: "0 1rem" }}>Blogs</Link>
  </nav>
);

export default Navbar;
