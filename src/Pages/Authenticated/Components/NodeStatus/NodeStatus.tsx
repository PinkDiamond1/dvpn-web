/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import themes from '../../../../commons/themes'

const Status = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`
const Title = styled.div`
  color: ${themes.current().colorDarkBlue};
  font-size: ${themes.current().fontSizeSmall};
  font-weight: 400;
  font-family: Ubuntu;
`

const OnlineStatus = styled.div`
  background: ${themes.current().colorGreen};
  font-size: ${themes.current().fontSizeSmallest};
  color: ${themes.current().colorWhite};
  font-weight: 400;
  font-family: Ubuntu;
  padding: 5px;
  border-radius: 10px;
`

export const NodeStatus = () => {
  return (
    <Status>
      <Title>Status:</Title>
      <OnlineStatus>Online</OnlineStatus>
    </Status>
  )
}