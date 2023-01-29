import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import { Inter } from "@next/font/google";

import AccessDenied from "../components/AccessDenied";
import SharedLayout from "../components/layout/SharedLayout";
import styles from "./../styles/Home.module.scss";
import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_API;

const inter = Inter({ subsets: ["latin"] });

export default function Component() {
  const router = useRouter();
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(false);
  const { data: session, loading, status } = useSession();


  console.log("loading: ", loading, status);

  // if (typeof window !== "undefined" && loading) return null;

  if (session) {
    return (
      <SharedLayout>
        Dashboard
        <p>Welcom {session?.user?.name}</p>
        <button
        onClick={() => signOut() }
        >Sign out</button>
      </SharedLayout>
    );
    
  }

  console.log("acces decnied", session)
  return <AccessDenied />
  
}
