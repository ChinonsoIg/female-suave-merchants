import styles from "../../styles/Auth.module.scss";
import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { FiKey } from "react-icons/fi";
import { MdKeyboardBackspace } from "react-icons/md"

import { FormInputs, FormWithValidation } from "../../components/Form";

const BASE_URL = process.env.NEXT_PUBLIC_API;

const schema = yup.object({
  email: yup.string().email().required(),
}).required();


const ForgotPasswordForm = () => {
  const [isBtnLoading, setIsBtnLoading] = useState(false)
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });


  const onSubmit = async (data) => {
    setIsBtnLoading(true);

    console.log(data);

    // const res = await fetch(`${BASE_URL}/auth/request-password-reset`, {
    //   method: 'POST',
    //   body: JSON.stringify(modifiedData),
    //   headers: { "Content-Type": "application/json" }
    // })
    // const data = await res.json();
    // console.log("data : ", data);

    const res = await axios.post(`${BASE_URL}/auth/request-password-reset`,
      data,
      {
        headers: {
          "Content-Type": "application/json"
        }
      })
    const resData = await res.json();
    console.log("data : ", resData);

    if (resData.status === 200) {
      setResetSuccess(true)
    } else {
      setResetError(true)
    }


    // axios.post(``, modifiedData, {
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // })
    //   .then((res) => {
    //     console.log("res", res);
    //     if (res.status === 200) {
    //       // setResestSuccess(true)

    //     }
    //   })
    //   .catch((error) => {
    //     console.log("err: ", error);
    //     // setResetError(true);
    //   })
    //   .finally(() => {
    //     setTimeout(() => {
    //       console.log('done')
    //       // setIsBtnLoading(false)
    //     }, 4800);
    //   })

  }


  return (
    <div className={styles.forgot_password_wrapper}>

      <div className={styles.forgot_password_container}>
        <div className={styles.key_box_outer}>
          <div className={styles.key_box_inner}>
            <FiKey size={20} color="#026897" />
          </div>
        </div>
        <h2>Forgot password?</h2>
        <p>No worries, we&apos;ll send you reset instruction.</p>

        {resetSuccess && <p className={styles.reset_success}>An password reset link has been sent to your email.
          {/* <span>Open email app</span> */}
        </p>}

        {resetError && <p className={styles.reset_error}>An error occured while attempting to send a password reset link. Try again later.</p>}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
        >
          <FormWithValidation
            htmlFor="email"
            title="Email"
            type="email"
            name="email"
            placeholder="Email"
            register={register("email")}
            errors={errors.email?.message}
          // data_testid="email"
          />

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
  )
}


export default ForgotPasswordForm;
