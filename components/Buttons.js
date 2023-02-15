import styles from "../styles/globals.module.scss";
import { useRouter } from "next/router";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

const ButtonPrimary = ({ click }) => {
  return (
    <button className={styles.btn_fill} onClick={click}>Button</button>
  )
}

const BackButton = ({ currentPath }) => {
  const router = useRouter();

  const goBack = () => {
    router.push(`/${currentPath}`)
  }

  return (
    <button className={styles.btn_back} onClick={goBack}>
      <MdOutlineKeyboardBackspace size={16} />
      Back
    </button>
  )
}


export { ButtonPrimary, BackButton }