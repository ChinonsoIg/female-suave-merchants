import styles from "../../styles/Auth.module.scss";
import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";

import { customToast } from "../../components/Toasts";

const BASE_URL = process.env.NEXT_PUBLIC_API;

const SignUp = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    password: ""
  });
  const [togglePassword, setTogglePassword] = useState(false);
  // const [isError, setIsError] = useState(false);
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

    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: { "Content-Type": "application/json" }
    })
    const data = await res.json();
    // console.log("reg: ", data)

    if (data.user) {

      setIsBtnLoading(false)
      customToast("success", "Registration successful", "top-right")
      setTimeout(() => {
        router.push("/auth/signin")
      }, 1000);

    } else {
  
      setIsBtnLoading(false)
      let msg = data?.message;
      return customToast("error", msg, "top-center");
    }

  };

  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="description" content="Signup" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.auth}>
        <div className={styles.auth_form_box}>
          <ToastContainer />
          <div className={styles.title_box}>
            <header className={styles.auth_title}>Welcome!</header>
            <p className={styles.auth_subtitle}>Enter details to sign up.</p>
          </div>
          <form className={styles.auth_form}>

            <div className={styles.inputs_box}>
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                className={styles.input_shared}
                onChange={handleInputsChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                className={styles.input_shared}
                onChange={handleInputsChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={styles.input_shared}
                onChange={handleInputsChange}
              />
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone number"
                className={styles.input_shared}
                onChange={handleInputsChange}
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
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
              <p>Have an acccount already? <Link href="/auth/signin">Sign In</Link></p>
            </div>
            <button
              // type="submit"
              className={!isBtnLoading ? styles.login_btn : styles.login_btn_loading}
              onClick={handleSubmit}
            >
            {!isBtnLoading ? "Sign up" : "Signing up..."}
            </button>
          </form>

        </div>
      </div>
    </>
  )
}

export default SignUp