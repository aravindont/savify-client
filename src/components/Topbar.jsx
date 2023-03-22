import { Link } from "react-router-dom";

export const Topbar = () => {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark navbar-exapnd-sm">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <i className="fa-regular fa-address-book"></i> Savify
          </Link>
        </div>
      </nav>
    </div>
  );
};
