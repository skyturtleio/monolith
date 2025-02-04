import React from 'react';
import { Head } from '@inertiajs/react'

export default function WelcomePage({ message, name }) {
  return (
    <>
      <Head title="Welcome" />
      <h1 className="text-2xl font-bold underline">{message}</h1>
      <p className="pt-4">Hello <span className="text-green-600 font-semibold">{name}</span>, welcome to your first Inertia app!</p>
      <p className="pt-4">
        The code for this project can be found <a
          className="underline"
          href="https://github.com/skyturtleio/monolith"
        >
          here</a>.
      </p>
    </>
  )
}
