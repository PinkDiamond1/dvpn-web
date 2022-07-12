/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ReactComponent as Logo } from '../../../assets/images/navigation/logo.svg'
import {
  DASHBOARD,
  HISTORY,
  SETTINGS,
  SETTINGS_ACCOUNT,
  SETTINGS_ADVANCED,
  SETTINGS_TRAFFIC,
  TRANSACTIONS,
} from '../../../constants/routes'

import './Navigation.scss'
import styled from 'styled-components'
import { ThemeSwitch } from '../Components/ThemeSwitch/ThemeSwitch'
import {
  ChatNavIcon,
  DashboardNavIcon,
  SessionsNavIcon,
  SettingsNavIcon,
  WalletNavIcon,
} from '../../../Components/Icons/NavigationIcons'
import { ReportIssue } from '../Components/ReportIssue/ReportIssue'

const Content = styled.div`
  background: ${({ theme }) => theme.bgNavigation};
  padding: 0 18px 0 18px;
  display: flex;
  height: 100%;
  position: relative;
  flex-direction: column;
  gap: 10px;
`

const LogoLink = styled(Link)`
  margin-top: 30px;
  margin-bottom: 41px;
`
const PlainLink = styled(NavLink)`
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const FlexGrow = styled.div`
  flex-grow: 1;
`
const Margin = styled.div`
  margin-bottom: 70px;
`

const Navigation = () => {
  const { pathname } = useLocation()

  // useEffect(() => {
  //   // Load intercom chat
  //   // @ts-ignore
  //   window.Intercom('boot', {
  //     app_id: 'h7hlm9on',
  //   })
  // }, [])

  return (
    <Content>
      <LogoLink to={DASHBOARD}>
        <Logo />
      </LogoLink>
      <PlainLink to={DASHBOARD}>
        <DashboardNavIcon $active={pathname === DASHBOARD} />
      </PlainLink>
      <PlainLink to={HISTORY}>
        <SessionsNavIcon $active={pathname === HISTORY} />
      </PlainLink>
      <PlainLink to={TRANSACTIONS}>
        <WalletNavIcon $active={pathname === TRANSACTIONS} />
      </PlainLink>
      <PlainLink to={SETTINGS}>
        <SettingsNavIcon
          $active={[SETTINGS, SETTINGS_TRAFFIC, SETTINGS_ADVANCED, SETTINGS_ACCOUNT].includes(pathname)}
        />
      </PlainLink>
      <FlexGrow />
      <ReportIssue />
      <ChatNavIcon $active={false} />
      <ThemeSwitch />
      <Margin />
    </Content>
  )
}
export default Navigation
