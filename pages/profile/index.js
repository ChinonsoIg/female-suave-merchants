import styles from "../../styles/Profile.module.scss";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { useFetchWithToken } from "../../utils/services";
import SharedLayout from '../../components/layout/SharedLayout'

const BASE_URL = process.env.NEXT_PUBLIC_API;
// const BASE_URL_LOCAL = process.env.NEXT_PUBLIC_API_LOCAL;

const Profile = () => {
  const [profile, setProfile] = useState("");
  const router = useRouter();

  const {
    status,
    data: session
  } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/signin")
    },
  });

  const { data: user } = useFetchWithToken(`${BASE_URL}/users`);

  // console.log("Se: ", session)
  // console.log("Se: ", user)

  return (
    <SharedLayout>
      <h1>Profile Overview</h1>
      <section className={styles.profile_container}>
        <article className={styles.profile_box}>
          <h3 className={styles.profile_content_header}>Account Details</h3>
          <div className={styles.profile_content}>
            <p>Name</p>
            <p>Email</p>
          </div>
        </article>
        <article className={styles.profile_box}>
          <h3 className={styles.profile_content_header}>Address Book</h3>
          <div className={styles.profile_content}>
            <p>Address</p>
            <p>Phone number</p>
          </div>
        </article>
      </section>
    </SharedLayout>
  )
}

export default Profile