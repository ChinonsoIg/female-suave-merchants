import styles from "../../styles/Layout.module.scss";
import React from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { MdArrowDropDown } from 'react-icons/md';
import { RiArrowDropDownFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BsSearch } from "react-icons/bs";

// import styles from "../../styles/Navbar.module.scss";

const navItems = [
  { id: 1, title: "Products", url: "products" },
  { id: 2, title: "Add Product", url: "add-product" },
];

export const Topbar = () => {
  const [open, setOpen] = React.useState(false);
  const [isDropdown, setIsDropdown] = React.useState(false);
  
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.topbar_container}>
      <div className={styles.sidebar_toggle} onClick={"toggleSidebar"}>
        <GiHamburgerMenu size={24} />
      </div>
      <img src={"logo"} alt="logo" className="logo" />
      <div className={styles.topbar_right_container}>

        <div className={styles.topbar_input_box}>
          <input className={styles.topbar_input} placeholder="Search for anything" />
          <BsSearch size={14} className={styles.topbar_input_icon} />
        </div>
        <div className={styles.topbar_profile_box}>
          <IoIosNotificationsOutline size={26} className={styles.notifications} />
          <div className={styles.user_profile}>
            <div className={styles.user_name}>
              <p>Adedeji</p>
              <p>Adedeji</p>
            </div>
            <img src="" style={{ height: "40px", width: "40px", borderRadius: "50%", border: "1px solid teal" }} />
          </div>
        </div>

        <div className={styles.topbar_profile_box_mobile}>
          <div className={styles.dropdown_btn} onClick={"handleDropdown"}>
            <img src={"avatar"} alt="avatar bell" className={styles.avatar} />
            <RiArrowDropDownFill size={24} />
          </div>
          {
            isDropdown ? (
              <div className={"dropdown_content_mobile"}>
                <p className="topbar_box_docs">Docs</p>
                <p className="topbar_box_docs">Notifications</p>
                <div className="topbar_input_box_mobile">
                  <input className="topbar_input" placeholder="Search for anything" />
                  <img src={"searchIcon"} className="topbar_input_icon" alt="search icon" />
                </div>
              </div>
            ) : null
          }
        </div>
      </div>

    </div>
  );
};
