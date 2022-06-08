/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { APIError } from 'mysterium-vpn-js'
import toasts from './toasts'

export const UNKNOWN_API_ERROR = 'Unknown API Error'

export const parseError = (error: any, defaultMsg?: string) => {
  return parseTequilApiError(error) || defaultMsg || error?.message || UNKNOWN_API_ERROR
}

export const parseToastError = (error: any) => {
  toasts.toastError(parseError(error))
}

const parseTequilApiError = (error: any): string | undefined => {
  if (error instanceof APIError) {
    const tqerr = error as APIError
    return tqerr.human()
  }
}

const errors = {
  parseError,
  parseToastError,
}

export default errors