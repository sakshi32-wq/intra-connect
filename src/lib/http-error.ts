/** Error shape shared by the mock db and (later) the real API client. */
export class HttpError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message)
    this.name = 'HttpError'
  }
}

export function isNotFound(error: unknown) {
  return error instanceof HttpError && error.status === 404
}
