import styles from "../../styles/Auth.module.scss";
import { useState } from "react";
import { signIn, getSession, getProviders } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
// import { Inter } from "@next/font/google";
import { AiFillFacebook, AiFillGithub, AiFillGoogleCircle } from "react-icons/ai";

const BASE_URL = process.env.NEXT_PUBLIC_API;

// const inter = Inter({ subsets: ["latin"] });

const sortLogo = (credentials) => {
  switch (credentials) {
    case 'facebook':
      return <AiFillFacebook size={18} color="" />
    case 'google':
      return <AiFillGoogleCircle size={18} color="" />
    case 'github':
      return <AiFillGithub size={18} color="" />
    default:
      console.log(`Sorry, we are out of ${credentials}.`);
      return null;
  }
}

const SignIn = ({ providers }) => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [togglePassword, setTogglePassword] = useState(false);
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

    const res = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      callbackUrl: "/",
    });

    // console.log("res signin: ", res)
  };

  // useEffect(() => {
  //   // console.log("providers : ", providers);
  // }, [providers]);


  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.login}>
        <div className={styles.login_form_box}>
          <div className={styles.title_box}>
            <header className={styles.login_title}>Welcome!</header>
            <p className={styles.login_subtitle}>Enter details to login</p>
          </div>
          <form className={styles.login_form}>
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
              <a href="#/reset_password">Forgot password?</a>
            </div>
            <button
              // type="submit"
              className={styles.login_btn}
              onClick={handleSubmit}
            >
              Log in
            </button>
          </form>

          <div className={styles.divider_box}>
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
        </div>
      </div>

    </>
  );
}



export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });
  const providers = await getProviders(context);

  // If sign in is successful, redirect to homepage
  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }

  return {
    props: { providers },
  };
}


// PR in NextAuth
// Add success handler to getServerSideProps
// This change adds a code that gives the user a sense of direction on what to do if the OAuth sign in is successful.


export default SignIn;

