import styles from "../../styles/Layout.module.scss";
import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { Topbar } from "./Topbar";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";

const SharedLayout = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDropdown, setIsDropdown] = React.useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  return (
    <div
      className={styles.container}
    >
      <Topbar
      toggleSidebar={toggleSidebar}
      handleDropdown={handleDropdown}
      isDropdown={isDropdown}
      />
      <div
        className={styles.layout}
      >
        <div className={`${styles.sidebar} ${isOpen ? styles.show_sidebar : styles.hide_sidebar}`}>
          <Sidebar />
        </div>
        <main
          className={styles.main}
        >
          {children}
        </main>
      </div>

    </div>
  );
};

export default SharedLayout;
