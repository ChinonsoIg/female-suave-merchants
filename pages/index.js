import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import { Inter } from "@next/font/google";

import AccessDenied from "../components/AccessDenied";
import SharedLayout from "../components/layout/SharedLayout";
import styles from "./../styles/Home.module.scss";
import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_API;

const inter = Inter({ subsets: ["latin"] });

export default function Component({ columns, data }) {
  const router = useRouter();
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(false);
  const { session, loading } = useSession();


  // console.log("products:", products);

  if (typeof window !== "undefined" && loading) return null;

  if (!session) {
    console.log("acces decnied")
    // return <AccessDenied />
  }

  return (
    <SharedLayout>
      Dashboard
      <p>Welcom {"session.user.name"}</p>
    </SharedLayout>
  );
}
