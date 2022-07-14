/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styled from 'styled-components'
import { useAppSelector } from '../../../../commons/hooks'
import { selectors } from '../../../../redux/selectors'
import { configs } from '../../../../commons/config'
import { myst } from '../../../../commons/mysts'
import { ProgressBar } from '../../../../Components/ProgressBar/ProgressBar'
import { themeCommon } from '../../../../theme/themeCommon'
import { useMemo } from 'react'

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

// const ProgressContainer = styled.div`
//   width: 200px;
//   display: none;
// `

const Title = styled.div`
  color: ${({ theme }) => theme.text.colorMain};
  font-size: ${themeCommon.fontSizeSmall};
  font-style: normal;
  font-weight: 400;
`

export const SettlementStatus = () => {
  const config = useAppSelector(selectors.configSelector)
  const { earningsTokens } = useAppSelector(selectors.currentIdentitySelector)
  const settleThresholdMyst = configs.zeroStakeSettlementThreshold(config)

  const value = useMemo(() => Number(myst.toEtherBig(earningsTokens.wei).toFixed(2)), [earningsTokens.wei])

  return (
    <Content>
      <Title>Next auto settlement ({myst.display(myst.toWeiBig(settleThresholdMyst), { fractionDigits: 1 })})</Title>
      <ProgressBar size={'small'} max={settleThresholdMyst} value={value} />
    </Content>
  )
}
