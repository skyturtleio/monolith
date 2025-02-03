import React from 'react';
import { Head } from '@inertiajs/react'

export default function WelcomePage({ message, name }) {
  return (
    <>
      <Head title="Welcome" />
      <h1 class="text-2xl font-bold underline">{message}</h1>
      <p class="pt-4">Hello <span class="text-green-600 font-semibold">{name}</span>, welcome to your first Inertia app!</p>
    </>
  )
}
