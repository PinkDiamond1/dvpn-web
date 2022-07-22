/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReactNode } from 'react'
import styled from 'styled-components'
import { themeCommon } from '../../../../theme/themeCommon'

const Card = styled.div`
  display: flex;
  gap: 16px;
  background: ${({ theme }) => theme.bgLayoutCardCss};
  padding: 20px;
  color: ${({ theme }) => theme.text.colorMain};
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
`

const Value = styled.div`
  font-size: ${themeCommon.fontSizeHuge};
  font-weight: 700;
  color: ${({ theme }) => theme.text.colorMain};
`

const Title = styled.div`
  font-size: ${themeCommon.fontSizeSmall};
  font-weight: 400;
  color: ${({ theme }) => theme.text.colorSecondary};
`

const Meta = styled.div`
  display: flex;
  flex-direction: column;
`

interface DiffValueProps {
  positive: boolean
}

const DiffValue = styled.div<DiffValueProps>`
  display: flex;
  justify-content: center;
  width: 80px;
  font-size: ${themeCommon.fontSizeNormal};
  padding: 4px 10px;
  border-radius: 100px;

  color: ${({ positive }) => (positive ? themeCommon.colorGreen : themeCommon.colorGrayBlue)};
  background: ${({ positive, theme }) => (positive ? theme.bgReportCardDiffPositive : themeCommon.colorLightBlue)};
`

interface Props {
  icon: ReactNode
  value: ReactNode
  title: string
  diff?: number
  tooltip?: ReactNode
}

export const ReportCard = ({ icon, value, title, tooltip, diff = 0 }: Props) => {
  return (
    <Card>
      <div>{icon}</div>
      <Content>
        <Value>{value}</Value>
        <Title>{title}</Title>
      </Content>
      <Meta>
        <DiffValue positive={diff > 0}>
          {diff > 0 ? '+ ' : '- '}
          {Math.abs(diff)}
        </DiffValue>
      </Meta>
    </Card>
  )
}
