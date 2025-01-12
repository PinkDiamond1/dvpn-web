/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const NEW_PASSWORD_ERROR_TO_SHORT = 'Your password should be at least 10 characters.'
const NEW_PASSWORD_ERROR_BLANK = 'Password fields cannot be blank.'
const NEW_PASSWORD_ERROR_NOT_SAME = "Passwords don't match"

interface ValidateResultInterface {
  success: boolean
  passwordBlank: boolean
  passwordNotSame: boolean
  passwordShort: boolean
  errorMessage: string
}

export const validatePassword = (password?: string, repeat?: string): ValidateResultInterface => {
  const response = {
    success: true,
    passwordBlank: false,
    passwordNotSame: false,
    passwordShort: false,
    errorMessage: '',
  }

  if (isBlank(password, repeat)) {
    response.success = false
    response.passwordBlank = true
    response.errorMessage = NEW_PASSWORD_ERROR_BLANK

    return response
  }

  if (!isEqual(password, repeat)) {
    response.success = false
    response.passwordNotSame = true
    response.errorMessage = NEW_PASSWORD_ERROR_NOT_SAME

    return response
  }

  if (isValid(password)) {
    response.success = false
    response.passwordShort = true
    response.errorMessage = NEW_PASSWORD_ERROR_TO_SHORT

    return response
  }

  return response
}

const isEqual = (password?: string, passwordRepeat?: string): boolean => password === passwordRepeat

const isValid = (password?: string): boolean => !password || password.length < 10

const isBlank = (password?: string, passwordRepeat?: string): boolean => !password || !passwordRepeat
