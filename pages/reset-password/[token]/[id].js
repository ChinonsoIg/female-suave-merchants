// import styles from "../../styles/globals.module.scss";
import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

// import { FormInputs } from "../../../components/Form";

const BASE_URL = process.env.NEXT_PUBLIC_API;


const ResetPassword = ({ children }) => {
  const [newPassword, setNewPassword] = useState("");
  // const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [resetSuccess, setResestSuccess] = useState(false);
  const [resetError, setResetError] = useState(false);

  const router = useRouter();
  const { token, id } = router.query;


  const handleSubmitNewPassword = async (e) => {
    e.preventDefault();

    let modifiedData = {
      userId: id,
      token,
      password: newPassword
    }

    axios.post(`http://localhost:5000/api/v1/auth/reset-password`, modifiedData, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        console.log("res", res);
        if (res.status === 200) {
          setResestSuccess(true)
          
          setTimeout(() => {
            router.push("/auth/signin")
          }, 5000);
        }
      })
      .catch((error) => {
        console.log("err: ", error);
        setResetError(true);
      })
      .finally(() => {
        setTimeout(() => {
          console.log('done')
          // setIsBtnLoading(false)
        }, 4800);
      })

  }


  return (
    <form onSubmit={handleSubmitNewPassword}>
      {resetError ? <p>Errorr</p> : null}
      {resetSuccess ? <p>Pasword reset successful. You'll be redirected to login page.</p> : null}

      <h1>Add new password</h1>
      {/* <p>You are not alone. We&apos;ve all been here at some point.</p> */}
      <p><input
        type="text"
        value={newPassword}
        placeholder="new password"
        onChange={({ target }) => setNewPassword(target.value)}
      />
      </p>
      {/* <p>
      <input
        type="password"
        value={0}
        placeholder="confirm password"
      />
      </p> */}
      <div>
        <input
          type="submit"
          // value={!loading ? "Get a secure link" : "Sending..."}
          // className={!loading ? styles.btn_fill : styles.btn_loading}
          role="button"
        />
      </div>
    </form>
  );

}

export default ResetPassword;