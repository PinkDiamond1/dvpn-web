/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Variant } from './types'

interface NatHumanInfo {
  connectionAcceptance: string
  label: string
  variant: Variant
}

export const nat2Human = (type: string): NatHumanInfo => {
  switch (type) {
    case 'none':
      return { connectionAcceptance: 'All', label: 'None', variant: 'ok' }
    case 'fullcone':
      return { connectionAcceptance: 'All', label: 'Full Cone', variant: 'ok' }
    case 'rcone':
      return { connectionAcceptance: 'All', label: 'Restricted Cone', variant: 'ok' }
    case 'prcone':
      return { connectionAcceptance: 'Most', label: 'Port Restricted Cone', variant: 'ok' }
    case 'symmetric':
      return { connectionAcceptance: 'Limited', label: 'Symmetric', variant: 'warning' }
    default:
      return { connectionAcceptance: 'Unknown', label: 'Unknown', variant: 'error' }
  }
}
