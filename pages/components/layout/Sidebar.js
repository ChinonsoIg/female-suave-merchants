import styles from "../../../styles/Layout.module.scss";
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { navItems } from "../../../utils/NavItems";

// import { GiUnderwear, GiAmpleDress, GiLipstick, GiRunningShoe } from "react-icons/gi";
// import { DiRuby } from "react-icons/di";
// import { AiFillHome } from "react-icons/ai";
import { MdSanitizer, MdOutlineLogout, MdAddBox } from "react-icons/md";
// import { BsFillPersonLinesFill } from "react-icons/bs";
// import { HiViewGridAdd } from "react-icons/hi";
import { AiFillDashboard } from "react-icons/ai";

// export const pickIcon = (value) => {
//   let Icon;
//   switch (value) {
//     case "ornaments":
//       Icon = <DiRuby />;
//       break;
//     case "homewears":
//       Icon = <AiFillHome />;
//       break;
//     case "dress":
//       Icon = <GiAmpleDress />;
//       break;
//     case "makeups":
//       Icon = <GiLipstick />;
//       break;
//     case "sanitaries":
//       Icon = <MdSanitizer />;
//       break;
//     case "underwears":
//       Icon = <GiUnderwear />;
//       break;
//     case "footwears":
//       Icon = <GiRunningShoe />;
//       break;
//     case "profile":
//       Icon = <BsFillPersonLinesFill />;
//       break;
//     case "logout":
//       Icon = <MdOutlineLogout />;
//       break;
//     default:
//       Icon = <HiViewGridAdd />;
//   }

//   return Icon;
// }


export const Sidebar = () => {
  const router = useRouter();
  const routerPath = router.asPath;
  // const style = {
  //   marginRight: 10,
  //   color: router.asPath === "href" ? 'red' : 'black',
  // }
  console.log("as path", router)

  return (
    <>
      <Link href="/" className={`${styles.flex_container_1} ${routerPath === "/" ? styles.active_link : null}`}>
        <AiFillDashboard />
        <p>Dashboard</p>
      </Link>
      <Link href="/add-product" className={`${styles.flex_container_2} ${routerPath === "/add-product" ? styles.active_link : null}`}>
        <MdAddBox />
        <p>New Product</p>
      </Link>
      <div>
        {
          navItems.map((navItem) => {
            const { _id, heading, items } = navItem;
            return (
              <div className={styles.nav_container} key={_id}>
                <p className={styles.nav_heading}>{heading}</p>
                <div>
                  {items.map((item) => {
                    const { id, title, url, icon } = item;
                    return (
                      <Link href={url}
                        className={`${styles.nav_item} ${routerPath === url ? styles.active_link : null}`}
                        key={id}>
                        {icon}
                        <p>{title}</p>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })
        }
      </div>
    </>

  )
}
