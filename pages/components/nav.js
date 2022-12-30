import React from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "../../styles/Navbar.module.scss";

const navItems = [
  { id: 1, title: "Home", url: "home" },
  { id: 2, title: "Products", url: "products" },
  { id: 3, title: "New Product", url: "new-product" },
];

const Navbar = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <nav className={styles.nav}>
      <p>Female Suave</p>
      <div>
        <ul>
          {navItems.map((navItem) => (
            <li key={navItem.id}>
              <Link href={navItem.url}>{navItem.title}</Link>
            </li>
          ))}
        </ul>
        <p>
          {!session && (
            <>
              <span className={styles.notSignedInText}>
                Not signed in
              </span>
              <a
                href={`/api/auth/signin`}
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
                href={`/api/auth/signout`}
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
        </p>
      </div>
    </nav>
  );
};

export default Navbar;
