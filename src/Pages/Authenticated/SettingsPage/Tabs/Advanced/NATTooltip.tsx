/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styled from 'styled-components'
import { NATType } from './types'
import { ReactNode } from 'react'
import { nat2Human } from './utils'
import { Tooltip } from '../../../../../Components/Tooltip/Tooltip'
import { Link } from '../../../../../Components/Common/Link'

const TooltipContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const TooltipTitle = styled.div`
  color: ${({ theme }) => theme.text.colorSecondary};
`
const TooltipDescription = styled.div`
  color: ${({ theme }) => theme.text.colorMain};
  font-size: ${({ theme }) => theme.common.fontSizeSmaller};
  font-weight: 400;
`

export const NATTooltip = ({ type }: { type: NATType }) => {
  return (
    <Tooltip
      content={
        <TooltipContainer>
          <TooltipTitle>NAT type: {nat2Human(type).label}</TooltipTitle>
          <TooltipDescription>{description(type)}</TooltipDescription>
        </TooltipContainer>
      }
    />
  )
}

const description = (type: NATType): ReactNode => {
  switch (type) {
    case 'fullcone':
    case 'none':
    case 'rcone':
      return 'Your node can accept connections from all users.'
    case 'prcone':
      return (
        <div>
          Your node can accept connections from some of the users, but cannot receive connections from users whose NAT
          type is symmetric. Please see our{' '}
          <Link href="https://docs.mysterium.network/troubleshooting/nat-traversal" target="_blank" rel="noreferrer">
            documentation
          </Link>{' '}
          for further information.
        </div>
      )
    case 'symmetric':
      return (
        <div>
          Your node can accept connections from some of the users, but cannot receive connections from users whose NAT
          type are symmetric and port-restricted cone. Please see our{' '}
          <Link href="https://docs.mysterium.network/troubleshooting/nat-traversal" target="_blank" rel="noreferrer">
            documentation
          </Link>{' '}
          for further information.
        </div>
      )
    default:
      return 'Unknown NAT type'
  }
}
