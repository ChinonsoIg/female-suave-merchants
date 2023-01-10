import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import { Inter } from "@next/font/google";

import styled from 'styled-components'
import { useTable } from 'react-table'

import Layout from "./components/layout";
import styles from "./../styles/Home.module.scss";
import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_API;

const inter = Inter({ subsets: ["latin"] });

export default function Component({ columns, data }) {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(`${BASE_URL}/products`, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWUxNzVmNWIzZmVjMWEyNWRiMDI4ZmYiLCJuYW1lIjoiSmFuZSBEb2UiLCJpYXQiOjE2NzI2MjUzOTgsImV4cCI6MTY3MjcxMTc5OH0.6QxwLy09OmfHlzk3eICi0RNOStZuZxzdvuPQxSRiCBU`,
            "Access-Control-Allow-Origin": "*",
          },
        });

        const data = await res.json();
        setProducts(data.products);
        console.log("data: ", data);
      } catch (err) {
        console.log(err);
      }
    };

    getProducts();
  }, []);

  console.log("products:", products);

  return (
    <Layout>
      <div className={styles.dashboard}>
        <div className={styles.flexContainer}>
          <div className={styles.flexItem}>total sales</div>
          <div className={styles.flexItem}>total returned</div>
          <div className={styles.flexItem}>total amt</div>
        </div>
        <div className={styles.products}>
          <p>Overview of recent sales</p>
          {/* <table>
            <thead>
              <th>S/N</th>
              <th>Name</th>
              <th>Price</th>
              <th>Status</th>
            </thead>
            {products.map((product, index) => {
              const { _id, name, price, status } = product;

              return (
                <tbody key={_id}>
                  <td>{index + 1}</td>
                  <td>{name}</td>
                  <td>{price}</td>
                  <td>{status}</td>
                </tbody>
              );
            })}
          </table> */}

        </div>
      </div>
    </Layout>
  );
}
