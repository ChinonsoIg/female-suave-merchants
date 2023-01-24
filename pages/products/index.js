import React from 'react';
import SharedLayout from "../components/layout";
import styles from "../../styles/Products.module.scss";

const BASE_URL = process.env.NEXT_PUBLIC_API;

const Product = ({ data }) => {
  const { count, products } = data;

  // console.log("data: ", data);

  return (
    <SharedLayout>
     <div className=""></div>
      <table className={styles.products_container}>
        <tbody>
        <tr>
          <th>S/N</th>
          <th>Name</th>
          <th>Category</th>
          <th>Quantity</th>
          <th>Status</th>
        </tr>
        {
          products.map((item, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.quatity}</td>
              <td>{item.status}</td>
            </tr>
          ))
        }
        </tbody>
        </table>
    </SharedLayout>
  )
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${BASE_URL}/products`, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWUxNzVmNWIzZmVjMWEyNWRiMDI4ZmYiLCJuYW1lIjoiSmFuZSBEb2UiLCJpYXQiOjE2NzM3MTYxNDIsImV4cCI6MTY3MzgwMjU0Mn0.LR561VffQv1spJQqD9WaS3ZfHQgNR6ttrFuQOoZUzlw`,
      "Access-Control-Allow-Origin": "*",
    },
  })
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}


export default Product;