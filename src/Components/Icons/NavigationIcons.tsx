/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled, { css } from 'styled-components'
import themes from '../../commons/themes'
import { ReactComponent as DashboardNavSvg } from '../../assets/images/navigation/dashboard.svg'
import { ReactComponent as HistoryNavSvg } from '../../assets/images/navigation/history.svg'
import { ReactComponent as TransactionsNavSvg } from '../../assets/images/navigation/transactions.svg'
import { ReactComponent as SettingsNavSvg } from '../../assets/images/navigation/settings.svg'
import { ReactComponent as BugNavSvg } from '../../assets/images/navigation/bug.svg'
import { ReactComponent as ChatNavSvg } from '../../assets/images/navigation/chat.svg'

interface NavProps {
  $active?: boolean
}

const navIconCss = css<NavProps>`
  rect {
    opacity: ${({ $active }) => ($active ? 1 : 0.05)};
  }
  path {
    stroke: ${({ $active }) => ($active ? themes.current().colorNavActiveStroke : themes.current().colorNavStroke)};
  }
`

export const DashboardNavIcon = styled(DashboardNavSvg)<NavProps>`
  ${navIconCss}
`

export const SessionsNavIcon = styled(HistoryNavSvg)<NavProps>`
  ${navIconCss}
`

export const WalletNavIcon = styled(TransactionsNavSvg)<NavProps>`
  ${navIconCss}
`

export const SettingsNavIcon = styled(SettingsNavSvg)<NavProps>`
  ${navIconCss}
`

export const BugNavIcon = styled(BugNavSvg)<NavProps>`
  ${navIconCss}
`

export const ChatNavIcon = styled(ChatNavSvg)<NavProps>`
  ${navIconCss}
`