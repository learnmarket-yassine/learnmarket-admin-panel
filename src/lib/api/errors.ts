import { isAxiosError } from 'axios'

const DEFAULT_ERROR_MESSAGE = 'Something went wrong. Please try again.'

export function getApiErrorMessage(error: unknown, fallback = DEFAULT_ERROR_MESSAGE): string {
  if (isAxiosError<{ message?: string | string[] }>(error)) {
    const message = error.response?.data?.message
    if (Array.isArray(message)) return message.join(', ')
    if (typeof message === 'string') return message
  }
  return fallback
}

export function isConflictError(error: unknown): boolean {
  return isAxiosError(error) && error.response?.status === 409
}
