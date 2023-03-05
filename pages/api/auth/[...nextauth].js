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
        const res = await fetch(`${BASE_URL}/auth/login`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })
        const data = await res.json();
        const { user, token } = data;

        // If you omit this, the login will go no matter the password. However, the user will be empty obj
        if (!user) {
          return null
        }

        return {
          ...user,
          // name: `${user.firstName} ${user.lastName}`,
          token
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
  session: {
    jwt: true,
    maxAge: 24 * 60 * 60,
    // updateAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token.accessToken) {
        session.user = token.user
        session.user.token = token.accessToken;
        return session;
      }

      session.user = token.user
      // session.user.token = token.accessToken;
      return session;
    },

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


// If you don't export this, server session will be null.
export { authOptions };

export default NextAuth(authOptions);
