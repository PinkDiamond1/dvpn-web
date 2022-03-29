/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { tequila } from '../../../../../api/wrapped-calls'
import { parseAndToastError } from '../../../../../commons/error.utils'
import { feeCalculator } from '../../../../../commons/fees'
import { myst } from '../../../../../commons/myst.utils'
import { Modal } from '../../../../../Components/Modal/Modal'
import Error from '../../../../../Components/Validation/Error'
import { selectors } from '../../../../../redux/selectors'
import { FeesTable } from '../../Fees/FeesTable'
import styles from './QuickSettleModal.module.scss'

interface Props {
  open?: boolean
  onClose: () => void
}

const { api } = tequila

export const QuickSettleModal = ({ open, onClose }: Props) => {
  const identity = useSelector(selectors.currentIdentitySelector)
  const fees = useSelector(selectors.feesSelector)
  const chainSummary = useSelector(selectors.chainSummarySelector)
  const isAutoWithdrawal = useSelector(selectors.isAutomaticWithdrawalSelector)
  const calculatedFees = useMemo(() => feeCalculator.calculateEarnings(identity.earningsTokens, fees), [
    fees.hermesPercent,
    fees.settlement,
    identity.earningsTokens.wei,
  ])

  const [loading, setLoading] = useState<boolean>(false)

  const isNegativeProfit = calculatedFees.profitsWei.lte(0)

  return (
    <Modal
      open={open}
      isLoading={loading}
      controls={{
        onClose,
        onSave: async () => {
          try {
            setLoading(true)
            await api.settleAsync({ providerId: identity.id, hermesId: identity.hermesId })
            onClose()
          } catch (err: any) {
            parseAndToastError(err)
          }
          setLoading(false)
        },
        onSaveLabel: 'settle',
        onSaveDisabled: isNegativeProfit,
      }}
    >
      <Error
        show={isNegativeProfit}
        errorMessage={`You don’t have enough earnings to cover settlement costs (at least ${myst.display(
          calculatedFees.totalFeesWei,
        )} is needed)`}
      />
      <p className={styles.header}>
        Please click SETTLE to proceed with settlement to {isAutoWithdrawal ? 'External wallet' : 'Balance'}. Note:
        Settlement transaction may take a few minutes to complete.
      </p>
      <FeesTable earnings={identity.earningsTokens} chainSummary={chainSummary} calculatedFees={calculatedFees} />
    </Modal>
  )
}
