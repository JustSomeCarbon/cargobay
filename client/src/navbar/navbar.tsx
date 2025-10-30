import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="navbar">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/ship">Ship</Link>
      </nav>
    </div>
  );
}

export default NavBar;
