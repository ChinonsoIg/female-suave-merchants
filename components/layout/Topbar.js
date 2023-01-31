import styles from "../../styles/Layout.module.scss";
import logo from "../../public/assets/images/logo.jpg";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { MdArrowDropDown, MdNotifications } from "react-icons/md";
import { RiArrowDropDownFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsSearch } from "react-icons/bs";

const myLoader = ({ src }) => {
  return src;
};

export const Topbar = ({ isDropdown, handleDropdown, toggleSidebar }) => {

  const { data: session, status } = useSession();

  let name = session?.user?.name;
  const nameArr = name?.split(" ");

  return (
    <div className={styles.topbar_container}>
      <div className={styles.sidebar_toggle} onClick={toggleSidebar}>
        <GiHamburgerMenu size={24} color="rgb(77, 0, 77)" />
      </div>
      <Image src={logo} alt="logo" width={50} height={20} className="logo" />
      <div className={styles.topbar_right_container}>

        <div className={styles.topbar_input_box}>
          <input className={styles.topbar_input} placeholder="Search for anything" />
          <BsSearch size={14} className={styles.topbar_input_icon} />
        </div>
        <div className={styles.topbar_profile_box}>
          <MdNotifications size={26} className={styles.notifications} />
          <div className={styles.user_profile}>
            <div className={styles.user_name}>
              <p>{nameArr && nameArr[0]}</p>
              <p>{nameArr && nameArr[1]}</p>
            </div>
            {
              session?.user?.image ? (
                <Image
                  loader={myLoader}
                  src={session?.user?.image}
                  height={50}
                  width={50}
                  alt="avatar"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "100%"
                  }}
                />
              ) : (
                <div className={styles.avatar}>
                  {`${nameArr && nameArr[0]?.slice(0, 1)}${nameArr && nameArr[1]?.slice(0, 1)}`}
                </div>
              )
            }
          </div>
        </div>

        <div className={styles.topbar_profile_box_mobile}>
          <div className={styles.dropdown_btn} onClick={handleDropdown}>
            {
              session?.user?.image ? (
                <Image
                  loader={myLoader}
                  src={session?.user?.image}
                  height={40}
                  width={40}
                  alt="avatar"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "100%"
                  }}
                />
              ) : (
                <div className={styles.avatar}>
                  {`${nameArr && nameArr[0]?.slice(0, 1)}${nameArr && nameArr[1]?.slice(0, 1)}`}
                </div>
              )
            }

            <RiArrowDropDownFill size={24} color="rgb(77, 0, 77)" />
          </div>
          {
            isDropdown ? (
              <div className={styles.dropdown_content_mobile}>
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
