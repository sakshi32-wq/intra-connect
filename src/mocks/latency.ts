const MIN_LATENCY_MS = 300
const MAX_LATENCY_MS = 600

/** Simulated network round-trip for every mock request. */
export function latency() {
  const ms = MIN_LATENCY_MS + Math.random() * (MAX_LATENCY_MS - MIN_LATENCY_MS)
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}
