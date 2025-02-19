import React from 'react';
import { Head } from '@inertiajs/react'

export default function AboutPage() {
  return (
    <>
      <Head title="About" />
      <h1 className="text-2xl font-bold underline">About Page</h1>
      <p className="pt-4">An extra route for an example to use Inertia's <code>Link</code> compoenent</p>
    </>
  )
}
