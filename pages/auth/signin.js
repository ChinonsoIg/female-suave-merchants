import styles from "../../styles/Auth.module.scss";
import { useState } from "react";
import { signIn, getProviders } from "next-auth/react";

import Head from "next/head";
import { useRouter } from "next/router";
import { AiFillFacebook, AiFillGithub, AiFillGoogleCircle } from "react-icons/ai";
import { IBM_Plex_Mono } from "@next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import Link from "next/link";
import { customToast } from "../../components/Toasts";
import { FormWithValidation } from "../../components/Form";


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

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string()
    .required("Password is required")
    .min(6, "Password length must be more than 6 characters")
    .max(20, "Password length cannnot exceed 20 characters"),
}).required();

const SignIn = ({ providers }) => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [togglePassword, setTogglePassword] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setIsBtnLoading(true);

      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: "/",
      });

      const { ok, error } = res;

      if (ok) {

        router.push("/");
        setTimeout(() => {
          setIsBtnLoading(false);
        }, 4000);

      } else {
        // console.log("wrong credentials: ", error)
        customToast("error", "Invalid email or password", "top-right")
        setIsBtnLoading(false);
      }


  }

  const handleTogglePassword = () => {
    setTogglePassword(!togglePassword)
  }


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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.auth_form}
          >
            <div className={styles.inputs_box}>
              <FormWithValidation
                htmlFor="email"
                title="Email"
                type="email"
                name="email"
                placeholder="Email"
                register={register("email")}
                errors={errors.email?.message}
              // data_testid="signin-email"
              />
              <div className={styles.password_container}>
                <FormWithValidation
                  htmlFor="password"
                  title="Password"
                  type={togglePassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  register={register("password")}
                  errors={errors.password?.message}
                // data_testid="signin-password"
                />
                <span className={styles.password_hide_show} onClick={handleTogglePassword}>{togglePassword ? "hide" : "show"}</span>
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

