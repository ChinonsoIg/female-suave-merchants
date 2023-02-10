import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const useFetchWithToken = (url) => {
  const [data, setData] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession()

  // const {
  //   data: session
  // } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     // The user is not authenticated, handle it here.
  //     router.push("/auth/signin")
  //   },
  // });
  const token = session?.user?.token;

  useEffect(() => {

    const controller = new AbortController();

    setTimeout(() => {
      setIsError(null);
      setIsLoading(true);

      axios.get(url, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      })
        .then((res) => {
          setData(res.data);
          setIsLoading(false);
        })
        .catch((err) => {

          // check if error is authentication error and redirect to home page
          // console.log("err: ", err)
          // if (err.name === "CanceledError") {
          //   console.log("Request aborted");
          //   return;
          // }
          setIsError(err);
          
        })
        .finally(() => {
          setIsLoading(false);
        })

    }, 1000);

    return () => controller.abort();

  }, [url, token]);

  console.log("token s: ", session)

  return { data, isLoading, isError };

}


const useFetchWithoutToken = (url) => {
  const [data, setData] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    data: session
  } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/auth/signin")
    },
  });
  const token = session?.user?.token;

  useEffect(() => {

    const controller = new AbortController();

    setTimeout(() => {
      setIsError(null);
      setIsLoading(true);

      axios.get(url, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      })
        .then((res) => {
          setData(res.data);
          setIsLoading(false);
        })
        .catch((err) => {

          // check if error is authentication error and redirect to home page
          // console.log("err: ", err)
          // if (err.name === "CanceledError") {
          //   console.log("Request aborted");
          //   return;
          // }
          setIsError(err);
          
        })
        .finally(() => {
          setIsLoading(false);
        })

    }, 1000);

    return () => controller.abort();

  }, [url, token]);

  return { data, isLoading, isError };

}

export { useFetchWithToken, useFetchWithoutToken };