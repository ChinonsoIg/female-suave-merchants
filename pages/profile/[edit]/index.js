import styles from "../../../styles/Profile.module.scss";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import { ToastContainer } from "react-toastify";

import { useFetchWithToken } from "../../../utils/services";
import SharedLayout from '../../../components/layout/SharedLayout';
import { FormInputs, FormTextArea } from "../../../components/Form";
import Loading from "../../../components/Loading";
import { BackButton } from "../../../components/Buttons";
import { customToast } from "../../../components/Toasts";

const BASE_URL = process.env.NEXT_PUBLIC_API;

const EditProfile = () => {
  const [formInputs, setFormInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const [isBtnLoading, setIsBtnLoading] = useState(false)

  const router = useRouter();
  const splitPath = router?.asPath?.split("/");
  const currentPath = splitPath ? splitPath[1] : null;

  const {
    status,
    data: session
  } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/signin")
    },
  });

  const token = session?.user?.token;
  const userId = session?.user?.userId;
  const { data: user } = useFetchWithToken(`${BASE_URL}/users/${userId}`);

  const handleInputsChange = (e) => {
    setFormInputs(() => ({
      ...formInputs,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsBtnLoading(true);

    let modifiedData = {
      ...formInputs,
      firstName: formInputs.firstName ? formInputs.firstName : user.user.firstName,
      lastName: formInputs.lastName ? formInputs.lastName : user.user.lastName,
      email: formInputs.email ? formInputs.email : user.user.email,
      phoneNumber: formInputs.phoneNumber ? formInputs.phoneNumber : user.user.phoneNumber,
      address: formInputs.address ? formInputs.address : user.user.address,
    };

    axios.patch(`${BASE_URL}/users/${userId}`, modifiedData, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        let resText = res?.statusText ? res?.statusText : "Account updated successfully."
        customToast("success", resText, "top-right")
      })
      .catch((error) => {
        let errTex = error?.response?.data?.message ? error?.response?.data?.message : "An error occured!"
        customToast("error", errTex, "top-center")
      })
      .finally(() => {
        setTimeout(() => {
          setIsBtnLoading(false)
        }, 4800);
      })

  }


  if ((status === "authenticated") && user) {
    return (
      <SharedLayout>
        <BackButton currentPath={currentPath} />
        <h1 className={styles.edit_profile_page_title}>Edit Profile</h1>
        <ToastContainer />
        <form
          className={styles.edit_profile_form}
          onSubmit={handleSubmit}
        >
          <div className={styles.edit_profile_input_container}>
            <FormInputs
              htmlFor="firstName"
              title="First Name"
              type="text"
              name="firstName"
              placeholder="First name"
              defaultValue={user.user.firstName}
              onChange={handleInputsChange}
              data_testid="firstName"
            />
            <FormInputs
              htmlFor="lastName"
              title="Last Name"
              type="text"
              name="lastName"
              placeholder="Last name"
              defaultValue={user.user.lastName}
              onChange={handleInputsChange}
              data_testid="lastName"
            />
          </div>
          <div className={styles.edit_profile_input_container}>
            <FormInputs
              htmlFor="email"
              title="Email"
              type="email"
              name="email"
              placeholder="Email"
              defaultValue={user.user.email}
              onChange={handleInputsChange}
              data_testid="email"
            />
            <FormInputs
              htmlFor="phoneNumber"
              title="Phone Number"
              type="number"
              name="phoneNumber"
              placeholder="Phone number"
              defaultValue={user.user.phoneNumber}
              onChange={handleInputsChange}
              data_testid="phoneNumber"
            />
          </div>
          <FormTextArea
            htmlFor="address"
            title="Address"
            type="text"
            name="address"
            placeholder="Address"
            defaultValue={user.user.address}
            onChange={handleInputsChange}
            data_testid="address"
          />
          <input
            type="submit"
            value={!isBtnLoading ? "Submit" : "Submitting..."}
            className={!isBtnLoading ? styles.btn_fill : styles.btn_loading}
            role="button"
          />
        </form>
      </SharedLayout>
    )
  }

  return <Loading />

}

export default EditProfile;