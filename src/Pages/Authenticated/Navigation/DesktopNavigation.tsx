/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styled from 'styled-components'
import { LINK_DEFINITIONS, CONTROLLER_DEFINITIONS } from './definitions'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ReactComponent as Logo } from '../../../assets/images/navigation/logo.svg'
import { useMemo, useState } from 'react'

const Content = styled.div`
  background: ${({ theme }) => theme.navigation.background};
  padding: 0 18px 0 18px;
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 10px;
  position: relative;
`
interface openProps {
  $open: boolean
}

const Title = styled.div``
const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 30px;
`
const FlexGrow = styled.div`
  flex-grow: 1;
`
const Margin = styled.div`
  margin-bottom: 70px;
`
const LogoLink = styled(Link)<openProps>`
  display: flex;
  margin-top: 30px;
  justify-content: flex-start;
  text-decoration: none;
  align-items: center;
  margin-bottom: 40px;
  gap: ${({ $open }) => ($open ? '40px' : 0)};
  transition: gap 0.3s;
  ${Title} {
    color: ${({ theme }) => theme.common.colorWhite};
    font-size: ${({ theme }) => theme.common.fontSizeHuge};
    font-weight: 900;
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    max-width: ${({ $open }) => ($open ? '200px' : 0)};
    overflow: hidden;
    white-space: nowrap;
    transition: opacity 0.3s, max-width 0.3s;
  }
`
const PlainLink = styled(NavLink)<openProps>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => theme.common.colorWhite};
  font-size: ${({ theme }) => theme.common.fontSizeBig};
  gap: ${({ $open }) => ($open ? '40px' : 0)};
  padding-right: ${({ $open }) => ($open ? '20px' : 0)};
  transition: gap 0.3s, padding-right 0.3s;

  ${Title} {
    text-decoration: none;
    color: ${({ theme }) => theme.common.colorWhite};
    font-size: ${({ theme }) => theme.common.fontSizeBig};
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    max-width: ${({ $open }) => ($open ? '200px' : 0)};
    overflow: hidden;
    white-space: nowrap;
    transition: opacity 0.3s, max-width 0.3s;
  }
`

export const DesktopNavigation = () => {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const toggleMenu = () => {
    setOpen(!open)
  }
  const Links = useMemo(
    () =>
      LINK_DEFINITIONS.map(({ icon: Icon, path, name, subPaths = [] }) => (
        <PlainLink
          key={`desktop-menu-item-${path}`}
          $open={open}
          to={path}
          onClick={() => {
            setOpen(false)
          }}
        >
          <Icon $active={[...subPaths, path].includes(pathname)} />
          {name && <Title>{name}</Title>}
        </PlainLink>
      )),
    [pathname, open],
  )
  const Controllers = useMemo(() => {
    return CONTROLLER_DEFINITIONS.map(({ name, component: Component }) => {
      return <Component key={`desktop-menu-controller-${name}`} transition={open} title={name} />
    })
  }, [open])
  return (
    <Content>
      <LogoLink $open={open} to="" onClick={toggleMenu}>
        <Logo />
        <Title>Node UI</Title>
      </LogoLink>
      <LinkContainer>{Links}</LinkContainer>
      <FlexGrow />
      {Controllers}
      <Margin />
    </Content>
  )
}
