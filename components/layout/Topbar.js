import React from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { MdArrowDropDown } from 'react-icons/md';

// import styles from "../../styles/Navbar.module.scss";

const navItems = [
  { id: 1, title: "Products", url: "products" },
  { id: 2, title: "Add Product", url: "add-product" },
];

export const Topbar = () => {
  const [open, setOpen] = React.useState(false);
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <nav>
      Top bar
    </nav>
  );
};
