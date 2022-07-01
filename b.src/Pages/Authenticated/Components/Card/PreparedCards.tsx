/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { SessionStats } from 'mysterium-vpn-js'
import { useMemo, useState } from 'react'
import { configs } from '../../../../commons/config'
import dates from '../../../../commons/dates'
import bytes from '../../../../commons/bytes'
import { myst } from '../../../../commons/mysts'
import { selectors } from '../../../../redux/selectors'
import { EarningsCard } from './EarningsCard/EarningsCard'
import { SettleSettingsModal } from './EarningsCard/SettleSettingsModal'
import { StatCard } from './StatCard'
import { useAppSelector } from '../../../../commons/hooks'

const { format, add } = bytes
const { seconds2Time } = dates

const UnsettledEarnings = () => {
  const identity = useAppSelector(selectors.currentIdentitySelector)
  const config = useAppSelector(selectors.configSelector)
  const { current } = useAppSelector(selectors.feesSelector)

  const [showModal, setShowModal] = useState<boolean>(false)

  const tooltipText = useMemo(
    () =>
      `These are confirmed earnings which are not settled to your Balance yet. Settlement to Balance is done either automatically when ${configs.zeroStakeSettlementThreshold(
        config,
      )} is reached or manually when SETTLE button is clicked. Please note that settlement fee is 20% plus blockchain fees (${myst.display(
        current.settlement.wei,
      )}), so Balance will be lower than Total earnings.`,
    [current.settlement.wei, config],
  )

  return (
    <>
      <StatCard
        stat={myst.display(identity.earnings, {
          fractionDigits: 2,
        })}
        name="Unsettled earnings"
        helpText={tooltipText}
        action="Settle"
        onAction={() => setShowModal(true)}
      />
      <SettleSettingsModal open={showModal} onClose={() => setShowModal(false)} onSave={() => {}} />
    </>
  )
}

const TotalWithdrawn = ({ amount }: { amount?: string }) => {
  return (
    <StatCard
      stat={myst.display(amount, {
        fractionDigits: 2,
      })}
      name="Total Settled"
      helpText="Total amount transferred to external wallet after all applicable fees."
    />
  )
}

const TotalEarnings = () => {
  const identity = useAppSelector(selectors.currentIdentitySelector)
  return (
    <StatCard
      stat={myst.display(identity.earningsTotal, {
        fractionDigits: 2,
      })}
      name="Total Earnings"
    />
  )
}

const SessionTime = ({ stats }: { stats: SessionStats }) => (
  <StatCard stat={seconds2Time(stats.sumDuration)} name="Sessions time" />
)

const Transferred = ({ stats }: { stats: SessionStats }) => (
  <StatCard stat={format(add(stats.sumBytesSent, stats.sumBytesReceived))} name="Transferred" />
)

const Sessions = ({ stats }: { stats: SessionStats }) => <StatCard stat={stats.count} name="Sessions" />

const UniqueClients = ({ stats }: { stats: SessionStats }) => (
  <StatCard stat={stats.countConsumers} name="Unique clients" />
)

export const Cards = {
  UnsettledEarnings,
  TotalWithdrawn,
  TotalEarnings,
  SessionTime,
  Transferred,
  Sessions,
  UniqueClients,
  EarningsCard,
}