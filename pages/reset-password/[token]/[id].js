import styles from "../../../styles/Auth.module.scss";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { FiKey } from "react-icons/fi";
import { MdKeyboardBackspace } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FormWithValidation } from "../../../components/Form";
import { customToast } from "../../../components/Toasts";


const BASE_URL = process.env.NEXT_PUBLIC_API;

const schema = yup.object({
  password: yup.string()
    .required("Password is required biko")
    .min(6, "Password length must be more than 6 characters")
    .max(20, "Password length cannnot exceed 20 characters"),
  confirmPassword: yup.string()
    .required("Confirm password is required")
    .min(6, "Password length must be more than 6 characters")
    .max(20, "Password length cannnot exceed 20 characters")
    .oneOf([yup.ref("password")], "Passwords do not match")
}).required();


const ResetPassword = () => {
  const [isBtnLoading, setIsBtnLoading] = useState(false);

  const router = useRouter();
  const { token, id } = router.query;

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const { password } = data;

    let modifiedData = {
      userId: id,
      token,
      password
    }

    axios.post(`${BASE_URL}/auth/reset-password`, modifiedData, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        console.log("res", res);
        if (res.status === 200) {
          let resText = "Password changed succesfully. You'll be redirected to Signin page"
          customToast("success", resText, "top-right");

          setTimeout(() => {
            router.push("/auth/signin");
          }, 5000);
        }
      })
      .catch((error) => {
        console.log("err: ", error);
        let errText = "An error occured. Try again later."
        customToast("success", errText, "top-right");
      })
      .finally(() => {
        setTimeout(() => {
          console.log('done')
          setIsBtnLoading(false)
        }, 4000);
      })

  }


  return (
    <div className={styles.forgot_password_wrapper}>
      <ToastContainer />

      <div className={styles.forgot_password_container}>
        <div className={styles.key_box_outer}>
          <div className={styles.key_box_inner}>
            <FiKey size={20} color="#026897" />
          </div>
        </div>
        <h2>Set new password?</h2>
        <p>Set a new password of your choivce.</p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
        >
          <div>
            <FormWithValidation
              htmlFor="password"
              title="Password"
              type="password"
              name="password"
              placeholder="Password"
              register={register("password")}
              errors={errors.password?.message}
            // data_testid="new_password"
            />
            <FormWithValidation
              htmlFor="confirmPassword"
              title="Confirm password"
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              register={register("confirmPassword")}
              errors={errors.confirmPassword?.message}
            // data_testid="confirm_password"
            />
          </div>

          <input
            type="submit"
            value={!isBtnLoading ? "Reset Password" : "Please wait..."}
            className={!isBtnLoading ? styles.submit : styles.submit_loading}
          />
        </form>

        <Link href="/auth/signin" className={styles.back_to_login}>
          <MdKeyboardBackspace />
          <span>Back to Signin</span>
        </Link>
      </div>
    </div>
  );

}

export default ResetPassword;