import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const customToast = (type, message, position) => {
  // console.log("Props: ", props)
  // const {message, type} = props

  toast(message, {
    type,
    position,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
}

export { customToast };