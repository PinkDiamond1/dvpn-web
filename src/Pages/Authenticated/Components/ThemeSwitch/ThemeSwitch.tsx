/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styled from 'styled-components'
import { MoonNavIcon, SunNavIcon } from '../../../../Components/Icons/NavigationIcons'
import { Switch } from '../../../../Components/Switch/Switch'
import { useAppSelector } from '../../../../commons/hooks'
import remoteStorage from '../../../../commons/remoteStorage'
import { UI_THEME_KEY } from '../../../../constants/remote-storage.keys'
import { themeCommon, alphaToHex } from '../../../../theme/themeCommon'

interface TransitionProps {
  $expanded: boolean
}
const Title = styled.div``
const ThemeStatus = styled.div``
const Column = styled.div``

const Container = styled.div<TransitionProps>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: ${({ $expanded }) => ($expanded ? '40px' : 0)};
  padding-right: ${({ $expanded }) => ($expanded ? '20px' : 0)};
  transition: gap 0.3s, padding-right 0.3s;
  ${Title} {
    text-decoration: none;
    color: ${({ theme }) => theme.common.colorWhite};
    font-size: ${({ theme }) => theme.common.fontSizeBig};
    opacity: ${({ $expanded }) => ($expanded ? 1 : 0)};
    max-width: ${({ $expanded }) => ($expanded ? '200px' : 0)};
    overflow: hidden;
    white-space: nowrap;
    transition: opacity 0.3s, max-width 0.3s;
  }
  ${ThemeStatus} {
    font-size: ${({ theme }) => theme.common.fontSizeNormal};
    color: ${themeCommon.colorWhite + alphaToHex(0.5)};
    opacity: ${({ $expanded }) => ($expanded ? 1 : 0)};
    max-width: ${({ $expanded }) => ($expanded ? '200px' : 0)};
    transition: opacity 0.3s, max-width 0.3s;
  }
  ${Column} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    justify-content: center;
    opacity: ${({ $expanded }) => ($expanded ? 1 : 0)};
    max-width: ${({ $expanded }) => ($expanded ? '200px' : 0)};
    margin-bottom: 10px;
  }
`
const SwitchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 40px;
  background: ${themeCommon.colorWhite}10;
  padding-bottom: 20px;
`

interface Props {
  title: string
  expanded: boolean
}

export const ThemeSwitch = ({ title, expanded }: Props) => {
  const theme = useAppSelector(remoteStorage.selector<string>(UI_THEME_KEY))
  const isDark = theme === 'dark'

  return (
    <Container $expanded={expanded}>
      <SwitchContainer>
        {isDark ? <MoonNavIcon /> : <SunNavIcon />}
        <Switch
          variant="key"
          size="small"
          checked={isDark}
          onChange={async () => {
            await remoteStorage.put<string>(UI_THEME_KEY, isDark ? 'light' : 'dark')
          }}
        />
      </SwitchContainer>
      <Column>
        <Title>{title}</Title>
        <ThemeStatus>{isDark ? 'On' : 'Off'}</ThemeStatus>
      </Column>
    </Container>
  )
}
