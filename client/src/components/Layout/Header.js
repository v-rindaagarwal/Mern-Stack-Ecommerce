import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineLogout,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BsCardList } from "react-icons/bs";
import { HiOutlineViewGrid } from "react-icons/hi";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <nav className="navbar navbar-expand-lg" style={styles.navbar}>
      <div className="container-fluid">
        <Link to="/" className="navbar-brand" style={styles.brand}>
          Ecommerce App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            

            <li className="nav-item" >
              <NavLink to="/" className="nav-link" style={styles.navLink}>
                <AiOutlineHome /> Home
              </NavLink>
            </li>
            <li className="nav-item dropdown" style={{marginLeft:"20px", marginRight:"20px"}} >
              <Link
                className="nav-link dropdown-toggle"
                to={"/categories"}
                data-bs-toggle="dropdown"
                style={styles.navLink}
              >
                <HiOutlineViewGrid /> Categories
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to={"/categories"}>
                    All Categories
                  </Link>
                </li>
                
                {categories?.map((c) => (
                  <li key={c.slug}>
                    <Link className="dropdown-item" to={`/category/${c.slug}`}>
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <SearchInput style={{ width: "500px" ,}} />
            {!auth?.user ? (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link" style={styles.navLink}>
                    <AiOutlineUser /> Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link" style={styles.navLink}>
                    <AiOutlineUser /> Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item dropdown" style={{marginLeft:"10px", marginRight:"20px"}}>
                  <NavLink
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    style={{ border: "none", ...styles.navLink }}
                  >
                    <AiOutlineUser /> {auth?.user?.name}
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="dropdown-item"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={handleLogout}
                        to="/login"
                        className="dropdown-item"
                      >
                        <AiOutlineLogout /> Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </>
            )}
            <li className="nav-item" style={{marginLeft:"20px", marginRight:"20px"}}>
              <NavLink to="/cart" className="nav-link" style={styles.navLink}>
                <Badge count={cart?.length} showZero offset={[10, -5]}>
                  <AiOutlineShoppingCart  / > 
                </Badge>
              </NavLink>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: "#ffc0cb", // White background
    boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)", 
    fontSize: "16px",
    fontWeight: "bold", // Subtle shadow
  },
  brand: {
    color: "#333", // Dark text color
    fontSize: "24px",
    fontWeight: "bold", // Make it bold
  },
  navLink: {
    color: "#555", // Slightly darker text color
    fontSize: "16px",
    fontWeight: "bold", // Use normal font weight
  },
};

export default Header;
