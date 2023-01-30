import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import FacebookProvider from "next-auth/providers/facebook";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API

const authOptions = {
  // session: {
  //   strategy: "jwt",
  // },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@email.com" },
        password: { label: "Password", type: "password", placeholder: "******" }
      },
      async authorize(credentials, req) {
        // let user = {};
        const res = await fetch("http://localhost:5000/api/v1/auth/login", {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })
        const user = await res.json();
        // user = {
        //   name: `${arrToJson.firstName} ${arrToJson.lastName}`,
        //   email: arrToJson.email,
        //   image: arrToJson.image
        // };
  
        // If no error and we have user data, return it
        if (res.ok && user) {
          return {...user}
        }
        // Return null if user data could not be retrieved
        return null
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // debug: false,
  // callbacks: {
  //   async jwt({ token }) {
  //     token.userRole = "admin"
  //     return token
  //   },
  // },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  }
  // session: {
  //   jwt: true,
  //   maxAge: 30 * 24 * 60 * 60,
  //   updateAge: 24 * 60 * 60,
  // },

}

export default NextAuth(authOptions);
