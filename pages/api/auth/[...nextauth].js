import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import FacebookProvider from "next-auth/providers/facebook";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@email.com" },
        password: { label: "Password", type: "password", placeholder: "******" }
      },
      async authorize(credentials, req) {
        console.log("req: ", req)
        console.log("cred: ", credentials)
        const res = await fetch("http://localhost:5000/api/v1/auth/login", {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })
        const data = await res.json();
        const { user } = data;

        return {
          ...user,
          name: `${user.firstName} ${user.lastName}`,
        }
  
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
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    }
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/new-user'
  },

  // What's the job of this one?
  // session: {
  //   jwt: true,
  //   maxAge: 30 * 24 * 60 * 60,
  //   updateAge: 24 * 60 * 60,
  // },

}

export default NextAuth(authOptions);
