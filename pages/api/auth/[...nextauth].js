import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import FacebookProvider from "next-auth/providers/facebook";

const BASE_URL = process.env.NEXT_PUBLIC_API

const authOptions = {
  // session: {
  //   strategy: "jwt",
  // },
  providers: [
    
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

}

export default NextAuth(authOptions);
