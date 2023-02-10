import { signIn, signOut } from 'next-auth/react'
import Link from 'next/link'

export default function AccessDenied() {
  return (
    <>
      <h1>Access Denied</h1>
      <p>You must be signed in to view this page</p>
      <button>
        <Link href="/auth/signin">Sign in</Link>
      </button>
      <button
            onClick={() => signOut()}
          >Sign out</button>
    </>
  )
}