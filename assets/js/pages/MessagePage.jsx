import { Head } from '@inertiajs/react'
import Layout from "../layouts/Layout";

export default function MessagePage({ message, name }) {
  return (
    <Layout>
      <Head title="Welcome" />
      <h1 class="text-2xl font-bold underline">{message}</h1>
      <p class="pt-4">Hello <span class="text-green-600 font-semibold">{name}</span>, welcome to your first Inertia app!</p>
    </Layout>
  )
}
