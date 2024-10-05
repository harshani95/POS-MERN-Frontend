import { Link } from "react-router-dom";

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogout }) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="navbar-brand">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRhowJ0cgtGyC-KrCESr6LIws0f7zQuIzex4BoM4bBUJGDCrIpjUEhXiJllo0a6FyxTMc&usqp=CAU"
              alt=""
              className="logo"
            />
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  <h3 style={{ color: "#0a3d62" }}>Product POS System</h3>
                </Link>
              </li>
              {isLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/customer">
                      Customers
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/orders">
                      Order Management
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/product">
                      Products
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="ms-auto d-flex">
            {isLoggedIn ? (
              <button
                className="btn btn-danger"
                type="button"
                onClick={onLogout}
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login">
                  <button className="btn btn-primary me-md-2" type="button">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="btn btn-success me-md-2" type="button">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
