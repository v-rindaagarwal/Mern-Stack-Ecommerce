import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            // eslint-disable-next-line no-octal-escape
            src="C:\Users\brind\ReactProject\Mern-Stack-Ecommerce\Images\123.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
  <div className="card">
    <div className="card-header bg-dark text-white text-center">
      <h1 className="mb-0">CONTACT US</h1>
    </div>
    <div className="card-body">
      <p className="card-text text-justify">
        If you have any questions or need information about our products,
        please don't hesitate to reach out to us. We are available 24/7 to assist you.
      </p>
      <ul className="list-unstyled">
        <li className="mt-3">
          <i className="bi bi-envelope"></i> Email: <a href="mailto:help@ecommerceapp.com">help@ecommerceapp.com</a>
        </li>
        <li className="mt-3">
          <i className="bi bi-telephone"></i> Phone: <a href="tel:0123456789">012-3456789</a>
        </li>
        <li className="mt-3">
          <i className="bi bi-headset"></i> Support: <a href="tel:18000000000">1800-0000-0000 (toll-free)</a>
        </li>
      </ul>
    </div>
  </div>
</div>

      </div>
    </Layout>
  );
};

export default Contact;
