import { useState } from "react";
import { signIn, signOut, getCsrfToken } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../../styles/Auth.module.scss";

const BASE_URL = process.env.NEXT_PUBLIC_API;

const inter = Inter({ subsets: ["latin"] });

export const CustomSignInPage = () => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const res = await signIn("credentials", {redirect: false})
    const res = await signIn("credentials", {
      // redirect: false,
      email: userInfo.email,
      password: userInfo.password,
      // callbackUrl: "/home",
    });

    console.log("res signin: ", res)
  };

  {
  }

  // console.log("url: ", BASE_URL)

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.authMain}>
        {/* <nav className={styles.authNav}>
          <p className={inter.className}>Female Suave</p>
        </nav> */}
        <div className={styles.authBox}>
          <div className={styles.authTitle}>
            <h1 className={inter.className}>Welcome back</h1>
            <p className={inter.className}>Login to continue</p>
          </div>
          <div className={styles.authInputs}>
            <form className={styles.authInputs} onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={userInfo.email}
                onChange={({ target }) =>
                  setUserInfo({ ...userInfo, email: target.value })
                }
              />
              <input
                type="password"
                placeholder="Password"
                value={userInfo.password}
                onChange={({ target }) =>
                  setUserInfo({ ...userInfo, password: target.value })
                }
              />
              <input type="submit" value="Login" />
              {/* <button
            onClick={(e) => {
              e.preventDefault();
              signIn("google", { callbackUrl: '', redirect: false }, { prompt: "none" });
            }}
          >
            Submit
          </button> */}
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
