import React, { useState } from "react";
import axios from "axios";

const ResetPasswordForm = () => {
  const [email, setEmail] = useState("")
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    let modifiedData = {
      email
    }

    const res = await fetch(`http://localhost:5000/api/v1/auth/request-password-reset`, {
      method: 'POST',
      body: JSON.stringify(modifiedData),
      headers: { "Content-Type": "application/json" }
    })

    const data = await res.json();
    console.log("data : ", data);


    // axios.post(`http://localhost:5000/api/v1/auth/request-password-reset`, modifiedData, {
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
    <div style={{ display: "grid", placeItems: "center" }}>
      <p>reset-password-form</p>
      {success && <p>An password reset link has been sent to your email</p>}
      {error && <p>An error occured while attempting to send a password reset link</p>}
      <input
        type="email"
        name="email"
        value={email}
        placeholder="Enter your email"
        onChange={({ target }) => setEmail(target.value)}
      />
      <button onClick={handleSubmit} style={{ marginTop: "20px" }}>
        submit
      </button>
    </div>
  )
}

export default ResetPasswordForm;
