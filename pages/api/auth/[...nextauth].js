import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"

const BASE_URL = process.env.NEXT_PUBLIC_API

const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: { },
      authorize(credentials, req) {
        const { email, password } = credentials;
        if (email !== "janedoe@yahoo.com" || password !== "janedoe") {
          // Any object returned will be saved in `user` property of the JWT
          return null;
        }
        
          return { id: "1", name: "Jane Doe", email: "janedoe@yahoo.com"  }

      //   const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

      // if (user) {
      //   // Any object returned will be saved in `user` property of the JWT
      //   return user
      // } else {
      //   // If you return null then an error will be displayed advising the user to check their details.
      //   return null

      //   // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      // }
        
        // // ${BASE_URL}/auth/login   //https://fakestoreapi.com/auth/login
        // const res = await fetch(`https://fakestoreapi.com/auth/login`, {
        //   method: "POST",
        //   body: JSON.stringify(credentials),
        //   headers: {
        //     "Content-Type": "application/json",
        //     // "Access-Control-Allow-Origin": "*"
        //   },
        // });

        // const user = await res.json();
        // if (res.ok && user) {
        //   console.log("user nextauth: ", user)
        //   return user;
        // } else {
        //   console.log("user: ", "null")
        //   // throw new Error("invalid credentials")
        // }

        // const user0 = { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // if (user0) {
        //   return user0
        // } else {
        //   return null
        //   // You can also Reject this callback with an Error or with a URL:
        //   // throw new Error('error message') // Redirect to error page
        //   // throw '/path/to/redirect'        // Redirect to a URL
        // }
      }

    }),
  ],
  pages: {
    signIn: "/auth/signin",
    // error: "/auth/error",
    // signUp: "/auth/signup",
  },
  callbacks: {
    jwt(params) {
      // update token
      if (params.user?.role) {
        params.token.role = params.user.role;
      }
      // return final_token
      return params.token;
    },
  },

  // http://localhost:3000/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F
  // http://localhost:3000/auth/signin?callbackUrl=https%3A%2F%2Flocalhost%3A3000

  // database: {
  //   type: "sqlite",
  //   database: ":memory:",
  //   synchronize: true,
  // },
  // secret: process.env.NEXT_PUBLIC_SECRET
}

export default NextAuth(authOptions);
