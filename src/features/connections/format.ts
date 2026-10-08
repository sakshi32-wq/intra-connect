/** Client secrets are never shown in full (SCREEN_MAP §6): eight dots and the last four characters. */
export function maskSecret(secret: string) {
  return secret === '' ? '—' : `${'•'.repeat(8)}${secret.slice(-4)}`
}
