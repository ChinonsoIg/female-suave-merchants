import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {

  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Mulish:wght@200;400;500;600;700&family=Roboto:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <body style={{ margin: "0px", boxSizing: "border-box", background: "#fbfbfb" }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
