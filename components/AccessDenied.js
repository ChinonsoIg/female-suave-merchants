import { signIn, signOut } from 'next-auth/react'
import Link from 'next/link'

export default function AccessDenied() {
  return (
    <>
      <h1>Access Denied</h1>
      <p>You must be signed in to view this page</p>
      <button
        onClick={(e) => {
          e.preventDefault()
          signIn()
        }}> Sign in</button>
    </>
  )
}