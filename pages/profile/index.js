import styles from "../../styles/Profile.module.scss";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { BiEditAlt } from "react-icons/bi";

import { useFetchWithToken } from "../../utils/services";
import SharedLayout from "../../components/layout/SharedLayout";

const BASE_URL = process.env.NEXT_PUBLIC_API;

const Profile = () => {

  const { data: session } = useSession();
  const userId = session?.user?.userId;

  const { data: user } = useFetchWithToken(`${BASE_URL}/users/merchant/${userId}`);

    return (
      <SharedLayout>
        <h1 className={styles.page_title}>Profile Overview</h1>
        <section className={styles.profile_container}>
          <article className={styles.profile_box}>
            <h3 className={styles.profile_content_header}>Account Details</h3>
            <div className={styles.profile_content}>
              <p>
                <span>{user?.user?.firstName ? user.user.firstName : null}</span>{" "}
                <span>{user?.user?.lastName ? user.user.lastName : null}</span>
              </p>
              <p>{user?.user?.email ? user?.user?.email : null}</p>
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
              <p>{user?.user?.address ? user?.user?.address : null}</p>
              <p>{user?.user?.phoneNumber ? user?.user?.phoneNumber : null}</p>
            </div>
          </article>
        </section>
      </SharedLayout>
    )

}

export default Profile;