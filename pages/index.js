import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import { Inter } from "@next/font/google";

import styled from 'styled-components'
import { useTable } from 'react-table'

import SharedLayout from "./components/layout/SharedLayout";
import styles from "./../styles/Home.module.scss";
import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_API;

const inter = Inter({ subsets: ["latin"] });

export default function Component({ columns, data }) {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);


  console.log("products:", products);

  return (
    <SharedLayout>
      Dashboard
    </SharedLayout>
  );
}
