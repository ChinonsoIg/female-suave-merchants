import styles from "../../styles/Auth.module.scss";
import { useState } from "react";
import { signIn, getProviders } from "next-auth/react";

import Head from "next/head";
import { useRouter } from "next/router";
import { AiFillFacebook, AiFillGithub, AiFillGoogleCircle } from "react-icons/ai";
import { IBM_Plex_Mono } from "@next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import Link from "next/link";
import { customToast } from "../../components/Toasts";


// const inter = Inter({ subsets: ["latin"] });

const sortLogo = (credentials) => {
  switch (credentials) {
    case "facebook":
      return <AiFillFacebook size={18} color="" />
    case "google":
      return <AiFillGoogleCircle size={18} color="" />
    case "github":
      return <AiFillGithub size={18} color="" />
    default:
      console.log(`Sorry, we are out of ${credentials}.`);
      return null;
  }
}

const IBMPlexMono = IBM_Plex_Mono({
  weight: '600',
  display: 'swap',
  subsets: ['latin'],
});

const SignIn = ({ providers }) => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [togglePassword, setTogglePassword] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const router = useRouter();

  const handleInputsChange = (e) => {
    setUserInfo(() => ({
      ...userInfo,
      [e.target.name]: e.target.value
    }))
  }

  const handleTogglePassword = () => {
    setTogglePassword(!togglePassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsBtnLoading(true)

    const res = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
      callbackUrl: "/",
    });

    const { ok, error } = res;

    if (ok) {
      
      router.push("/");
      setTimeout(() => {
        setIsBtnLoading(false);
      }, 3000);

    } else {
      // console.log("wrong credentials: ", error)
      customToast("error", "Invalid email or password", "top-right")
      setIsBtnLoading(false);
    }

  };


  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Signin" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer />
      <div className={styles.auth}>
        <div className={styles.auth_form_box}>
          <div className={styles.title_box}>
            <header className={styles.auth_title}>Welcome!</header>
            <p className={styles.auth_subtitle}>Enter details to sign in.</p>
          </div>
          <form className={styles.auth_form}>
            <div className={styles.inputs_box}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={styles.input_shared}
                onChange={handleInputsChange}
              />
              <div className={styles.password_container}>
                <input
                  name="password"
                  type={togglePassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={handleInputsChange}
                />
                <span onClick={handleTogglePassword}>{togglePassword ? "hide" : "show"}</span>
              </div>
              <div>
                <Link href="/forgot-password">Forgot password?</Link>
                <p>Don&apos;t have an account? <Link href="/auth/signup">Sign up</Link></p>
              </div>
            </div>
            <button
              // type="submit"
              className={!isBtnLoading ? styles.login_btn : styles.login_btn_loading}
              onClick={handleSubmit}
            >
              {!isBtnLoading ? "Sign in" : "Signing in..."}
            </button>
          </form>

          {/* <div className={styles.divider_box}>
            <span className={styles.divider_box_content}>
              or
            </span>
          </div>

          <div className={styles.auth_providers}>
            {providers &&
              Object.values(providers).filter((fil) => fil.id !== "credentials").map((provider) => {
                return (
                  <div key={provider.name}>
                    <button
                      className={styles.auth_provider}
                      onClick={() => signIn(provider.id)}>
                      <span>{sortLogo(provider.id)}</span>
                      Continue with {provider.name}
                    </button>
                  </div>
                );
              })}
          </div>
           */}
        </div>
      </div>

    </>
  );
}



export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If sign in is successful, redirect to homepage
  if (session) {
    return {
      redirect: { destination: "/", permanent: false },
    };
  }

  const providers = await getProviders(context);
  return {
    props: { providers },
  };
}


// PR in NextAuth
// Add success handler to getServerSideProps
// This change adds a code that gives the user a sense of direction on what to do if the OAuth sign in is successful.


export default SignIn;

