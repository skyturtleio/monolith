import React, { useState } from 'react';
import { Head } from '@inertiajs/react'


export default function Counter() {
  const [count, setCount] = useState(0)

  function handleClick() {
    setCount(x => x + 1)
  }

  function resetCounter() {
    setCount(0);
  }

  return (
    <>
      <Head title="Counter" />
      <h1 class="text-2xl mb-4 font-bold underline underline-offset-4">Counter</h1>
      <button
        onClick={handleClick}
        className="rounded-md bg-blue-600 my-2 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >Clicked {count} {count === 1 ? "time" : "times"}
      </button>
      <br />
      <button
        onClick={resetCounter}
        className="rounded-md bg-blue-600 my-2 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >Reset</button>
    </>
  )
}

