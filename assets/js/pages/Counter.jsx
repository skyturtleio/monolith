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
      <button onClick={handleClick}>{count}</button>
    </>
  )
}

