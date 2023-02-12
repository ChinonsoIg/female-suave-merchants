import styles from "../../styles/Layout.module.scss";
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signOut } from "next-auth/react"
import { MdAddBox, MdOutlineLogout } from "react-icons/md";
import { AiFillDashboard } from "react-icons/ai";

import { navItems } from "../../utils/NavItems";


export const Sidebar = () => {
  const router = useRouter();
  const routerPath = router.asPath;

  // console.log("as path", router)

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
                      <Link href={`${url}`}
                        className={`${styles.nav_item} ${routerPath.includes(url) ? styles.active_link : null}`}
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
      <Link
        href="/auth/signin"
        className={styles.logout}
        onClick={(e) => {
          e.preventDefault()
          signOut()
        }}
      >
        <MdOutlineLogout />
        <p>Logout</p>
      </Link>
    </>

  )
}
