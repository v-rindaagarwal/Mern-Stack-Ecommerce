import React from "react";
import { Link } from "react-router-dom";
import About from "./../../pages/About";
const Footer = () => {
  return (
    <div className="footer">
      <div className="bg-dark text-light p-3 m-0">
        <h1 className="text-center">
          All Right Reserved &copy; Brinda Agarwal
        </h1>
        <p className="text-center ">
          <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
          <Link to="/policy">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
};

export default Footer;
