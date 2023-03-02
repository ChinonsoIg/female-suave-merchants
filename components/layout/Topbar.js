import styles from "../../styles/Layout.module.scss";
import React from "react";
import Image from "next/image";
import { IBM_Plex_Mono } from "@next/font/google";
import { useSession } from "next-auth/react";
import { MdNotifications } from "react-icons/md";
import { RiArrowDropDownFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsSearch } from "react-icons/bs";


const myLoader = ({ src }) => {
  return src;
};

const IBMPlexMono = IBM_Plex_Mono({
  weight: '600',
  display: 'swap',
  subsets: ['latin'],
});


export const Topbar = ({ isDropdown, handleDropdown, toggleSidebar }) => {

  const { data: session, status } = useSession();

  const firstName = session?.user?.firstName;
  const lastName = session?.user?.lastName;

  const firstNameFallback = firstName.slice(0,1);
  const lastNameFallback = lastName.slice(0,1);


  return (
    <div className={styles.topbar_container}>
      <div className={styles.sidebar_toggle} onClick={toggleSidebar}>
        <GiHamburgerMenu size={24} color="#026897" />
      </div>
      <h1 className={IBMPlexMono.className}>
        <span className={styles.logo_font_one}>Female</span>
        <span className={styles.logo_font_two}>Suave</span>
      </h1>
      <div className={styles.topbar_right_container}>

        <div className={styles.topbar_input_box}>
          <input className={styles.topbar_input} placeholder="Search for anything" />
          <BsSearch size={14} className={styles.topbar_input_icon} />
        </div>
        <div className={styles.topbar_profile_box}>
          <MdNotifications size={26} className={styles.notifications} />
          <div className={styles.user_profile}>
            <div className={styles.user_name}>
              <p>{firstName}</p>
              <p>{lastName}</p>
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
                  {`${firstNameFallback}${lastNameFallback}`}
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
                  {`${firstNameFallback}${lastNameFallback}`}
                </div>
              )
            }

            <RiArrowDropDownFill size={24} color="#026897" />
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
