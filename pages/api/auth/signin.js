import { signIn } from "next-auth/react";

export default function CustomSignInPage() {
  return (
    <div>
      <h1>Welcome to your custom sign-in page</h1>
      <button
        onClick={(e) => {
          e.preventDefault();
          signIn();
        }}
      >
        Cool Custom GitHub Button
      </button>
    </div>
  );
}
