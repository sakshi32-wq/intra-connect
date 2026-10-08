import { createFileRoute } from '@tanstack/react-router'

// Temporary landing page; Phase 2 replaces it with a redirect to /overview or /login.
export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <main className="grid min-h-screen place-items-center">
      <h1 className="text-title font-semibold">IntraConnect</h1>
    </main>
  )
}
