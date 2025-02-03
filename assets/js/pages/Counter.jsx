import React, { useState } from 'react';
import { Head } from '@inertiajs/react'


export default function Counter() {
  const [count, setCount] = useState(0)

  function handleClick() {
    setCount(x => x + 1)
  }

  return (
    <>
      <Head title="Counter" />
      <h1 class="text-2xl font-bold underline">Counter</h1>
      <button
        onClick={handleClick}
        className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >{count}</button>
    </>
  )
}

