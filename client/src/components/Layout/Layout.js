import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div style={styles.container}>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={styles.main}>
        <Toaster />

        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Ecommerce App - Shop Now",
  description: "Your one-stop shop for everything!",
  keywords: "e-commerce, shopping, online store",
  author: "Techinfoyt",
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
  },
  main: {
    minHeight: "70vh",
    padding: "20px",
    backgroundColor: "#f8f8f8",
  },
};

export default Layout;
