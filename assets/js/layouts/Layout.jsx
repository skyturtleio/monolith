import React from "react";
import { Link } from "@inertiajs/react";

export default function Layout({ children }) {
  return (
    <>
      <header class="mb-6 space-x-2 underline">
        <Link href="/" prefetch>Home</Link>
        <Link href="/counter" prefetch={['mount']}>Counter</Link>
        <a href="/default">Default</a>
      </header>
      <div>
        {children}
      </div>
    </>
  )
}
