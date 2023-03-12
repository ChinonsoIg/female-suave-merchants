import styles from "../../styles/Layout.module.scss";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Topbar } from "./Topbar";
import { Sidebar } from "./Sidebar";
import LoadingSpinner from "../LoadingSpinner";

const SharedLayout = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDropdown, setIsDropdown] = React.useState(false);
  const router = useRouter();

  const {
    status,
    data: session
  } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/signin")
    },
  });

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  if (status === "authenticated") {
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
  }

  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        height: "100vh"
      }}
    >
      <LoadingSpinner height="20px" width="20px" />
    </div>
  );

};

export default SharedLayout;
