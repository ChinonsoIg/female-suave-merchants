import { useEffect } from 'react'
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import SharedLayout from '../../components/layout/SharedLayout';

const Home = () => {
  const router = useRouter();
  const { status, data } = useSession();
  const ses = useSession();

  // useEffect(() => {
  //   if (status === "unauthenticated" ) router.replace("/auth/signin");
  // }, [status])
  
  console.log("status homepage: ", ses);
  // console.log("data: ", data)

  if (status === "authenticated") {
    return (
      <SharedLayout>
        <div>Add home</div>
      </SharedLayout>
    );
  }

  return <div>loading...</div>
  
}

export default Home