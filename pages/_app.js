import { SessionProvider } from "next-auth/react";
// import Error from "next/error";


export default function App({ Component, pageProps }) {

  // if (pageProps.error) {
  //   console.log("err: ", pageProps.error)
  //   return (
  //     <Error
  //       statusCode={pageProps.error.statusCode} 
  //       title={pageProps.error.message}
  //     />
  //   )
  // }


  return (
    <SessionProvider session={pageProps.session} 
      // basePath="https://female-suave-merchants.vercel.app/api/auth"
    >
      <Component {...pageProps} />
    </SessionProvider>
  );
}
