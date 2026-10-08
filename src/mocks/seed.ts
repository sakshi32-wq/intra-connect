// Deterministic helpers so fixtures are identical on every load.

export function createRandom(seed: number) {
  let state = seed >>> 0
  const next = () => {
    // mulberry32
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  return {
    next,
    int: (min: number, max: number) => min + Math.floor(next() * (max - min + 1)),
    pick: <T>(items: ReadonlyArray<T>): T => items[Math.floor(next() * items.length)],
    chance: (probability: number) => next() < probability,
    digits: (length: number) =>
      Array.from({ length }, () => Math.floor(next() * 10)).join(''),
  }
}

const BASE_TIME = Date.UTC(2026, 8, 30, 15, 30)
const MINUTE = 60_000

/** ISO timestamp `minutesAgo` minutes before the fixed fixture "now". */
export function minutesAgo(minutes: number) {
  return new Date(BASE_TIME - minutes * MINUTE).toISOString()
}

export function padId(prefix: string, index: number) {
  return `${prefix}_${String(index + 1).padStart(3, '0')}`
}
