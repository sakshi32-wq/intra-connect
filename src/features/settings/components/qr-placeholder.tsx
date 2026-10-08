const SIZE = 25

/** Top-left corners of the three 7×7 finder squares. */
const FINDERS = [
  [0, 0],
  [SIZE - 7, 0],
  [0, SIZE - 7],
] as const

function inFinderZone(x: number, y: number) {
  return FINDERS.some(([fx, fy]) => x >= fx - 1 && x <= fx + 7 && y >= fy - 1 && y <= fy + 7)
}

/** Deterministic pseudo-random modules (FNV-1a over the seed) so the tile looks like a QR code. */
function modules(seed: string) {
  const cells: Array<[number, number]> = []
  let hash = 2166136261
  for (const char of seed) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619)
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      hash = Math.imul(hash ^ (x * 31 + y), 16777619)
      if (!inFinderZone(x, y) && (hash >>> 7) % 5 < 2) cells.push([x, y])
    }
  }
  return cells
}

/**
 * Stand-in for the frame 12 QR code: no QR library is installed, so this draws a
 * QR-like pattern. The real code would encode the otpauth:// URI for `seed`.
 */
export function QrPlaceholder({ seed, label }: { seed: string; label: string }) {
  return (
    <svg viewBox={`-1 -1 ${SIZE + 2} ${SIZE + 2}`} role="img" aria-label={label} className="size-[164px]" shapeRendering="crispEdges">
      {FINDERS.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect x={x} y={y} width={7} height={7} fill="currentColor" />
          <rect x={x + 1} y={y + 1} width={5} height={5} fill="white" />
          <rect x={x + 2} y={y + 2} width={3} height={3} fill="currentColor" />
        </g>
      ))}
      {modules(seed).map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="currentColor" />
      ))}
    </svg>
  )
}
