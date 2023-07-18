import { useSession, signIn } from "next-auth/react";
import Nav from "@/components/Nav";
import { useState } from "react";
import Logo from "@/components/Logo";

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(false);
  const { data: session } = useSession();

  const handleSignInWithCredentials = async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    await signIn("credentials", { username, password });
  };

  if (!session) {
    return (
      <div className="bg-bgGray w-screen h-screen flex items-center">
        <div className="text-center w-full flex flex-col items-center">
          <input
            type="text"
            id="username"
            placeholder="Username"
            className="bg-white p-2 px-4 rounded-lg mb-2 w-64 text-center"
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="bg-white p-2 px-4 rounded-lg mb-2 w-64 text-center"
          />
          <button
            onClick={handleSignInWithCredentials}
            className="bg-blue-900 text-white p-2 px-4 rounded-lg w-64"
          >
            Sign In with Credentials
          </button>
          <button
            onClick={() => signIn("google")}
            className="bg-red-500 text-white p-2 px-4 rounded-lg mt-2 w-64"
          >
            Sign In with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bgGray min-h-screen">
      <div className="md:hidden flex items-center p-4">
        <button onClick={() => setShowNav(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className="flex grow justify-center mr-6">
          <Logo />
        </div>
      </div>
      <div className="flex">
        <Nav show={showNav} />
        <div className="flex-grow p-4">{children}</div>
      </div>
    </div>
  );
}
