import styles from "../styles/globals.module.scss";
import React from 'react'

const FormInputs = ({ htmlFor, title, type, name, placeholder, data_testid, onChange, value, defaultValue }) => {
  return (
    <>
      <label htmlFor={htmlFor} className={styles.label}>
        {title}
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          data-testid={data_testid}
          onChange={onChange}
          value={value}
          defaultValue={defaultValue}
        />
      </label>
    </>
  )
}

const FormTextArea = ({ htmlFor, title, type, name, placeholder, data_testid, onChange, value, defaultValue }) => {
  return (
    <>
      <label htmlFor={htmlFor} className={styles.label}>
        {title}
        <textarea
          type={type}
          name={name}
          placeholder={placeholder}
          data-testid={data_testid}
          onChange={onChange}
          value={value}
          defaultValue={defaultValue}
        />
      </label>
    </>
  )
}

const FormWithValidation = ({ htmlFor, title, type, name, placeholder, data_testid, onChange, value, defaultValue, register, errors }) => {


  return (
    <div className={styles.form_input_container}>
      <label htmlFor={htmlFor} className={styles.label}>
        {title}
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          data-testid={data_testid}
          onChange={onChange}
          value={value}
          defaultValue={defaultValue}
          {...register}
        />
      </label>
      <p>{errors}</p>
    </div>
  )
}



export { FormInputs, FormTextArea, FormWithValidation };