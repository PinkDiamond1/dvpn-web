/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { DECIMAL_PART, DisplayMoneyOptions } from 'mysterium-vpn-js'
import Decimal from 'decimal.js'
import { currentCurrency } from './money.utils'
import { DEFAULT_MONEY_DISPLAY_OPTIONS } from './index'

const displayMYST = (
  amount: string | number | undefined,
  options: DisplayMoneyOptions = DEFAULT_MONEY_DISPLAY_OPTIONS,
): string => {
  const symbol = options?.showCurrency ? ' ' + currentCurrency() : ''
  if (!amount) {
    return `0${symbol}`
  }

  const requiredPrecision = options?.fractionDigits || 18

  const decimal = Decimal.clone({ precision: requiredPrecision })
  const humanAmount = new decimal(amount).div(DECIMAL_PART)

  if (-1 * humanAmount.e > requiredPrecision) {
    return `< ${new decimal('1').div(Math.pow(10, requiredPrecision)).toFixed()}${symbol}`
  }
  return `${new decimal(amount).div(DECIMAL_PART).toFixed()}${symbol}`
}

export const myst = {
  displayMYST,
}