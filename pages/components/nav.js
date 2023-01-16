import React from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { MdArrowDropDown } from 'react-icons/md';

import styles from "../../styles/Navbar.module.scss";

const navItems = [
  { id: 1, title: "Products", url: "products" },
  { id: 2, title: "Add Product", url: "add-product" },
];

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.navBox}>
        <p>Female Suave</p>
        <div className={styles.dropdown}>
          <div className={styles.dropdownBtn} onClick={handleOpen}>
            Menu
            <MdArrowDropDown />
          </div>

          <ul className={styles.dropdownContentDesktop}>
          {navItems.map((navItem) => (
            <li key={navItem.id}>
              <Link href={navItem.url}>{navItem.title}</Link>
            </li>
          ))}
          <li>
          {!session && (
            <>
              <a
                href={`/auth/signin`}
                className={styles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault();
                  signIn();
                }}
              >
                Sign in
              </a>
            </>
          )}
          {session?.user && (
            <>
              {session.user.image && (
                <span
                  style={{ backgroundImage: `url('${session.user.image}')` }}
                  className={styles.avatar}
                />
              )}
              <span className={styles.signedInText}>
                <small>Signed in as</small>
                <br />
                <strong>{session.user.email ?? session.user.name}</strong>
              </span>
              <a
                href={`/auth/signout`}
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                Sign out
              </a>
            </>
          )}
          </li>
        </ul>

          {open ? (
            <ul className={styles.dropdownContentMobile}>
              {navItems.map((navItem) => (
                <li key={navItem.id}>
                  <Link href={navItem.url}>{navItem.title}</Link>
                </li>
              ))}
              <li>
                {!session && (
                  <>
                    <a
                      href={`/auth/signin`}
                      className={styles.buttonPrimary}
                      onClick={(e) => {
                        e.preventDefault();
                        signIn();
                      }}
                    >
                      Sign in
                    </a>
                  </>
                )}
                {session?.user && (
                  <>
                    {session.user.image && (
                      <span
                        style={{
                          backgroundImage: `url('${session.user.image}')`,
                        }}
                        className={styles.avatar}
                      />
                    )}
                    <span className={styles.signedInText}>
                      <small>Signed in as</small>
                      <br />
                      <strong>{session.user.email ?? session.user.name}</strong>
                    </span>
                    <a
                      href={`/auth/signout`}
                      className={styles.button}
                      onClick={(e) => {
                        e.preventDefault();
                        signOut();
                      }}
                    >
                      Sign out
                    </a>
                  </>
                )}
              </li>
            </ul>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
