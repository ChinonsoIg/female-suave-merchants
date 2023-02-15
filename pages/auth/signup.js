import styles from "../../styles/Auth.module.scss";
import { useState } from "react";

import Head from "next/head";
import { useRouter } from "next/router";



const SignUp = () => {
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

    console.log("res signin: ", res)
  };

  return (
    <div className={styles.login}>
      <div className={styles.login_form_box}>
        <div className={styles.title_box}>
          <header className={styles.login_title}>Welcome!</header>
          <p className={styles.login_subtitle}>Enter details to register</p>
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
            <p>Have an acccount already? <a href="/auth/signin">Log In</a></p>
          </div>
          <button
            // type="submit"
            className={styles.login_btn}
            onClick={handleSubmit}
          >
            Log in
          </button>
        </form>

      </div>
    </div>
  )
}

export default SignUp