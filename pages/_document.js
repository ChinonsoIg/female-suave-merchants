import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@200;400&family=Roboto:wght@300;400&display=swap" rel="stylesheet" />
      </Head>
      <body style={{ margin: "0px", boxSizing: "border-box"  }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
