import React from "react";
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
        <div>
          <p>John Doe</p>
          <p>john@yahoo.com</p>
          <p>Date</p>
        </div>
        <button>Edit profule</button>
      </div>

      
      <div className={styles.main}>
        <Navbar />
        <div className={styles.mainBox}>
          {/* <section className={styles.contents}> */}
            {children}
            
          {/* </section> */}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
