import styles from "../../styles/Profile.module.scss";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { BiEditAlt } from "react-icons/bi";

import { useFetchWithToken } from "../../utils/services";
import SharedLayout from '../../components/layout/SharedLayout'

const BASE_URL = process.env.NEXT_PUBLIC_API;
// const BASE_URL_LOCAL = process.env.NEXT_PUBLIC_API_LOCAL;

const Profile = () => {
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

  const userId = session?.user?.userId;

  const { data: user } = useFetchWithToken(`${BASE_URL}/users/${userId}`);

  // console.log("Se: ", session)
  // console.log("Us: ", user)

  return (
    <SharedLayout>
      <h1>Profile Overview</h1>
      <section className={styles.profile_container}>
        <article className={styles.profile_box}>
          <h3 className={styles.profile_content_header}>Account Details</h3>
          <div className={styles.profile_content}>
            <p>{`${user?.user?.firstName} ${user?.user?.lastName}`}</p>
            <p>{user?.user?.email}</p>
          </div>
        </article>
        <article className={styles.profile_box}>
        <h3 className={`${styles.profile_content_header} ${styles.profile_content_header_addressbook}`}>
            Address Book
            <Link href="/profile/edit">
              <BiEditAlt color="#03a9f4" size={20} />
            </Link>
          </h3>
          <div className={styles.profile_content}>
            <p>{user?.user?.address}</p>
            <p>Phone number</p>
          </div>
        </article>
      </section>
    </SharedLayout>
  )
}

export default Profile