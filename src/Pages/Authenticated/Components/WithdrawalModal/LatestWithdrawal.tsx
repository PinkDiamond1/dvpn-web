/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useState } from 'react'
import { tequilaClient } from '../../../../api/tequila-client'
import { Settlement, SettlementType } from 'mysterium-vpn-js'
import styles from './WithdrawalModal.module.scss'
import { media } from '../../../../commons/media.utils'
import { strings } from '../../../../commons/strings.utils'
import { useMediaQuery } from 'react-responsive'

export const LatestWithdrawal = () => {
  const isMobile = useMediaQuery(media.isMobileQuery)
  const [withdrawal, setWithdrawal] = useState<Settlement | undefined>()
  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    const latestWithdrawal = await tequilaClient
      .settlementHistory({ types: [SettlementType.Withdrawal], pageSize: 1 })
      .then((resp) => resp.items.find((it) => it))
    setWithdrawal(latestWithdrawal)
  }

  if (!withdrawal) {
    return <></>
  }

  const { blockExplorerUrl, txHash } = withdrawal

  const enhancedTxHash = isMobile ? strings.truncateHash(txHash) : txHash

  return (
    <div className={styles.tx}>
      Your last transaction:{' '}
      {blockExplorerUrl ? (
        <a data-testid="LatestWithdrawal.txLink" href={blockExplorerUrl} rel="noreferrer" target="_blank">
          {enhancedTxHash}
        </a>
      ) : (
        <span data-testid="LatestWithdrawal.txPlain" style={{ color: '#000' }}>
          {enhancedTxHash}
        </span>
      )}
    </div>
  )
}