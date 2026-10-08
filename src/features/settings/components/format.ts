/** "22 Jan, 2022 at 04:30 PM" (frames 13, 14, 17); `month: 'long'` gives "23 January, 2021 …" (10). */
export function formatDateTime(iso: string, month: 'short' | 'long' = 'short') {
  const date = new Date(iso)
  const day = date.toLocaleDateString('en-GB', { day: 'numeric', month })
  const year = date.getFullYear()
  const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
  return `${day}, ${year} at ${time}`
}
