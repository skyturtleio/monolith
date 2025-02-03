import React from "react";
import { Link } from "@inertiajs/react";

export default function Layout({ children }) {
  return (
    <>
      <header class="mb-6 space-x-2 underline">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <a href="/default">Default</a>
      </header>
      <div>
        {children}
      </div>
    </>
  )
}
