import { useEffect } from 'react'
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { Inter } from "@next/font/google";

import Layout from "./components/layout"
import styles from "./../styles/Home.module.scss";

const inter = Inter({ subsets: ["latin"] });


export default function Component() {
  const router = useRouter(); 
  const { status, data: session } = useSession();

  const ses = useSession();

  // useEffect(() => {
  //   if (status === "unauthenticated" ) router.replace("/auth/signin");
  // }, [status])

  console.log("ses aftre login:", ses)

  // if(status === "authenticated") {
    return <Layout>
      SIGNED IN AS {session?.user?.email} <br/>
      <button onClick={() => signOut()}>Sign out</button>
    </Layout>
  // }

  // return <Layout>
  //   NOT SIGNED IN <br/>
  //   <button onClick={() => signIn()}>Sign in</button>
  // </Layout>
}
