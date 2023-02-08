import axios from "axios";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    status,
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
    setIsLoading(true);
    setIsError(null)

    axios.get(url, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      }
    })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setIsError(err)
        // check if error is authentication error and redirect to home page
        // console.log("err: ", err)
      })
      .finally(() => {
        setIsLoading(false)
      })

  }, [url, token]);

  return { data, isLoading, isError };

}

export default useFetch;