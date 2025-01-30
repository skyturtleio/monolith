import { Link } from "@inertiajs/react";

export default function Layout({ children }) {
  return (
    <>
      <header class="mb-6 space-x-2 underline">
        <a href="/">Home</a>
        <Link href="/about">About</Link>
        <Link href="/message">Message</Link>
      </header>
      <div>
        {children}
      </div>
    </>
  )
}
