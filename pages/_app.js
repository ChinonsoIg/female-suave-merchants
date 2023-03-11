import { SessionProvider } from "next-auth/react";


export default function App({ Component, pageProps }) {


  return (
    <SessionProvider session={pageProps.session} 
      basePath="https://female-suave-merchants.vercel.app/api/auth"
    >
      <Component {...pageProps} />
    </SessionProvider>
  )
}
