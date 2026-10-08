import { createStart } from '@tanstack/react-start'

// The app is frontend-only: the mock db and the auth session live in the
// browser (in-memory + localStorage), so loaders and beforeLoad must run on
// the client. Re-enable SSR per route once a real API exists.
export const startInstance = createStart(() => ({
  defaultSsr: false,
}))
