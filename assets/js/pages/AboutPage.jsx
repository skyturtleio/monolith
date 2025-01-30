import { Head } from '@inertiajs/react'
import Layout from "../layouts/Layout";

export default function AboutPage() {
  return (
    <Layout>
      <Head title="About" />
      <h1 class="text-2xl font-bold underline">About Page</h1>
      <p class="pt-4">An extra route for an example to use Inertia's <code>Link</code> compoenent</p>
    </Layout>
  )
}
