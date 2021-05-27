import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

const NotFoundPage = () => {
  return (
    <>
      <Header />
      Page not found. Goto <Link to="/home">Home Page</Link>
    </>
  );
};

export default NotFoundPage;
