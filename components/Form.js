import styles from "../styles/globals.module.scss";
import React from 'react'

const FormInputs = ({htmlFor, title, type, name, placeholder, onChange}) => {
  return (
    <>
      <label htmlFor={htmlFor} className={styles.label}>
        {title}
        <input type={type} name={name} placeholder={placeholder} onChange={onChange} />
      </label>
    </>
  )
}

const FormTextArea = ({htmlFor, title, type, name, placeholder, onChange}) => {
  return (
    <>
      <label htmlFor={htmlFor} className={styles.label}>
        {title}
        <textarea type={type} name={name} placeholder={placeholder} onChange={onChange} />
      </label>
    </>
  )
}

export { FormInputs, FormTextArea };