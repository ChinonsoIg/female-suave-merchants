import styles from "../../styles/Layout.module.scss";
import logo from "../../public/assets/images/logo.jpg";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { MdArrowDropDown } from 'react-icons/md';
import { RiArrowDropDownFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BsSearch } from "react-icons/bs";

// const myLoader = ({ src, width, quality }) => {
//   return `https://example.com/${src}?w=${width}&q=${quality || 75}`
// }

export const Topbar = ({ isDropdown, handleDropdown, toggleSidebar }) => {
  
  const { data: session, status } = useSession();
  // const loading = status === "loading";
  console.log("ld: ", status, session)

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.topbar_container}>
      <div className={styles.sidebar_toggle} onClick={toggleSidebar}>
        <GiHamburgerMenu size={24} />
      </div>
      <Image src={logo} alt="logo" width={50} height={20} className="logo" />
      <div className={styles.topbar_right_container}>

        <div className={styles.topbar_input_box}>
          <input className={styles.topbar_input} placeholder="Search for anything" />
          <BsSearch size={14} className={styles.topbar_input_icon} />
        </div>
        <div className={styles.topbar_profile_box}>
          <IoIosNotificationsOutline size={26} color="#39CDCC" className={styles.notifications} />
          <div className={styles.user_profile}>
            <div className={styles.user_name}>
              <p>Chinonso</p>
              <p>Chinonso</p>
            </div>
            {/* <Image src={session?.user?.image} height={50} width={50} /> */}
          </div>
        </div>

        <div className={styles.topbar_profile_box_mobile}>
          <div className={styles.dropdown_btn} onClick={handleDropdown}>
          {/* <img src="https://picsum.photos/200/200" style={{ height: "40px", width: "40px", borderRadius: "50%", border: "1px solid teal" }} /> */}
            <RiArrowDropDownFill size={24} />
          </div>
          {
            isDropdown ? (
              <div className={styles.dropdown_content_mobile}>
                {/* <p className={styles.topbar_box_docs}>Notifications</p> */}
                <div className={styles.topbar_input_box_mobile}>
                  <input className={styles.topbar_input_mobile} placeholder="Search for anything" />
                  <BsSearch size={14} className={styles.topbar_input_icon_mobile} />
                  {/* <img src={"searchIcon"} className="topbar_input_icon" alt="search icon" /> */}
                </div>
              </div>
            ) : null
          }
        </div>
      </div>

    </div>
  );
};
