/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styled from 'styled-components'
import themes from '../../commons/themes'

interface BarProps {
  $size: 'big' | 'small'
  $primary?: boolean
}

interface ProgressProps {
  $width?: number
}

export const Bar = styled.div<BarProps>`
  height: ${({ $size }) => {
    return $size === 'big' ? '9px' : '4px'
  }};
  width: ${({ $size }) => {
    return $size === 'big' ? '347px' : '126px'
  }};
  border-radius: 10px;
  background-color: ${themes.common.colorGrayBlue};
`
const Container = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Progress = styled.div<ProgressProps>`
  display: flex;
  justify-content: flex-end;
  height: 100%;
  width: ${({ $width }) => `${$width}%`};
  border-radius: 10px;
  background-color: ${themes.common.colorKey};
`
const Circle = styled.span`
  position: absolute;
  height: 8px;
  width: 8px;
  border-radius: 50%;
  background: #fff;
  border: 3px solid ${themes.common.colorKeyLight};
  transform: translateY(-2px) translateX(4px);
`
const Mark = styled.span<BarProps>`
  height: ${({ $size }) => {
    return $size === 'big' ? '4px' : '1px'
  }};
  width: 1px;
  border-radius: ${({ $size }) => {
    return $size === 'big' ? '10px' : '50%'
  }};
  background-color: ${({ $primary }) => ($primary ? themes.common.colorGrayBlue : `${themes.common.colorGrayBlue2}10`)};
`
const MarkContainer = styled.div<BarProps>`
  width: ${({ $size }) => {
    return $size === 'big' ? '347px' : '124px'
  }};
  box-sizing: border-box;
  display: flex;
  margin: 4px 20px;
  justify-content: space-between;
`
interface Props {
  settleThresholdMyst: number
  earningsTokens: number
  size: 'big' | 'small'
}

export const ProgressBar = ({ settleThresholdMyst, earningsTokens, size }: Props) => {
  console.log(settleThresholdMyst, earningsTokens)
  const width = (earningsTokens / settleThresholdMyst) * 100
  console.log(width)
  return (
    <Container>
      <Bar $size={size}>
        <Progress $width={width}>{size === 'small' && <Circle />}</Progress>
      </Bar>
      <MarkContainer $size={size}>
        {[...Array(11)].map((_, i) => {
          return <Mark $size={size} $primary={i % 2 ? false : true} />
        })}
      </MarkContainer>
    </Container>
  )
}
