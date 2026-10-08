/** Server-side error under an auth form (e.g. rejected credentials). */
export function FormError({ error }: { error: Error | null }) {
  if (!error) return null
  return (
    <p role="alert" className="text-sm font-medium text-destructive">
      {error.message}
    </p>
  )
}
