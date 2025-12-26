import React from "react";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="min-h-[80vh] bg-gray-50">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
