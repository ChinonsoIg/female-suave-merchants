import React from "react";
import { AiFillEdit } from "react-icons/ai";
import Navbar from "./nav";
import styles from "../../styles/Layout.module.scss";
import Footer from "./footer";

const Layout = ({ children }) => {
  return (
    <div className={styles.view}>
      <div className={styles.sidebar}>
        <img
          src="https://picsum.photos/id/237/200/200"
          width="100"
          height="100"
          alt="avatar"
          className={styles.avatar}
        />
        <div className={styles.personalData}>
          <p>John Doe</p>
          <p>john@yahoo.com</p>
          <p>Date</p>
          <a href="/profile">Edit profile <AiFillEdit /> </a>
        </div>
      </div>

      <div className={styles.main}>
        <Navbar />
        <div className={styles.mainBox}>{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
