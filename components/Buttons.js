import styles from "../styles/globals.module.scss";
import { useRouter } from "next/router";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

const Button = () => {
  return (
    <div>Button</div>
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


export { Button, BackButton }