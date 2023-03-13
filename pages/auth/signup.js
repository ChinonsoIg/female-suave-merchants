import styles from "../../styles/Auth.module.scss";
import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { customToast } from "../../components/Toasts";
import { FormTextAreaWithValidation, FormWithValidation } from "../../components/Form";

const BASE_URL = process.env.NEXT_PUBLIC_API;

const schema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email().required("Email is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  address: yup.string()
    .min(10, "Password length must be more than 10 characters")
    .max(250, "Password length cannnot exceed 250 characters")
    .required("Address is required"),
  password: yup.string()
    .required("Password is required")
    .min(6, "Password length must be more than 6 characters")
    .max(20, "Password length cannnot exceed 20 characters"),
}).required();


const SignUp = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const handleTogglePassword = () => {
    setTogglePassword(!togglePassword)
  }

  const onSubmit = async (data) => {
    setIsBtnLoading(true);

    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    })
    const resData = await res.json();

    if (resData.user) {

      setIsBtnLoading(false)
      customToast("success", "Registration successful", "top-right")
      setTimeout(() => {
        router.push("/auth/signin")
      }, 1000);

    } else {

      setIsBtnLoading(false)
      let msg = resData?.message;
      return customToast("error", msg, "top-center");
    }

  }

  return (
    <>
      <Head>
        <title>Sign up</title>
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.auth_form}
          >
            <div
              className={styles.inputs_box}
            >
              <FormWithValidation
                htmlFor="firstName"
                title="First name"
                type="text"
                name="firstName"
                placeholder="First name"
                register={register("firstName")}
                errors={errors.firstName?.message}
              // data_testid="signup-firstName"
              />
              <FormWithValidation
                htmlFor="lastName"
                title="Last name"
                type="text"
                name="lastName"
                placeholder="Last name"
                register={register("lastName")}
                errors={errors.lastName?.message}
              // data_testid="signup-lastName"
              />
              <FormWithValidation
                htmlFor="email"
                title="Email"
                type="email"
                name="email"
                placeholder="Email"
                register={register("email")}
                errors={errors.email?.message}
              // data_testid="signup-email"
              />
              <FormWithValidation
                htmlFor="phoneNumber"
                title="Phone number"
                type="text"
                name="phoneNumber"
                placeholder="Phone number"
                register={register("phoneNumber")}
                errors={errors.phoneNumber?.message}
              // data_testid="signup-phoneNumber"
              />
              <FormTextAreaWithValidation
                htmlFor="address"
                title="Address"
                type="text"
                name="address"
                placeholder="Address"
                register={register("address")}
                errors={errors.address?.message}
              // data_testid="signup-address"
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
                // data_testid="signup-password"
                />
                <span className={styles.password_hide_show} onClick={handleTogglePassword}>{togglePassword ? "hide" : "show"}</span>
              </div>
              <p>Have an acccount already? <Link href="/auth/signin">Sign In</Link></p>
            </div>
            <input
              type="submit"
              role="button"
              className={!isBtnLoading ? styles.login_btn : styles.login_btn_loading}
              value={!isBtnLoading ? "Sign up" : "Signing up..."}
            />
          </form>

        </div>
      </div>
    </>
  )
}

export default SignUp