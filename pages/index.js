// import { useState } from "react";
// import Head from "next/head";
// import Image from "next/image";
// import { Inter } from "@next/font/google";
// import styles from "../styles/Auth.module.scss";

// const inter = Inter({ subsets: ["latin"] });

// export default function Home() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(email, password);
//   }

//   return (
//     <>
//       <Head>
//         <title>Login</title>
//         <meta name="description" content="Generated by create next app" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       <main className={styles.authMain}>
//         <nav className={styles.authNav}>
//           <p className={inter.className}>Female Suave</p>
//         </nav>
//         <div className={styles.authBox}>
//           <div className={styles.authTitle}>
//             <h1 className={inter.className}>Welcome back</h1>
//             <p className={inter.className}>Login to continue</p>
//           </div>
//           {/* <div> */}
//             <form className={styles.authInputs} onSubmit={handleSubmit}>
//               <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
//               <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
//               <input type="submit" />
//             </form>
//           {/* </div> */}
//         </div>
//       </main>
//     </>
//   );
// }

import { useSession, signIn, signOut } from "next-auth/react"
import Layout from "./components/layout"

export default function Component() {
  const { data: session } = useSession()
  if(session) {
    return <Layout>
      Signed in as {session.user.email} <br/>
      <button onClick={() => signOut()}>Sign out</button>
    </Layout>
  }
  return <Layout>
    Not signed in <br/>
    <button onClick={() => signIn()}>Sign in</button>
  </Layout>
}
