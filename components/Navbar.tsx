"use client"; // Required for interactive components
import React from 'react';

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          CertesLex
        </Link>
        <div className="space-x-4">
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/team" className="hover:underline">Team</Link>

          {session ? (
            <>
              <span>Welcome, {session.user?.name}</span>
              <button
                onClick={() => signOut()}
                className="bg-red-500 px-3 py-1 rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="bg-blue-500 px-3 py-1 rounded-md"
            >
              Login with Google
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
