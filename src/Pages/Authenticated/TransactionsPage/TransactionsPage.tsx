/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useMemo, useState } from 'react'
import { Layout, LayoutRow } from '../Components/Layout/Layout'
import { TransactionsHeaderIcon } from '../../../Components/Icons/PageIcons'
import { Table } from '../../../Components/Table/Table'
import { DownloadTransactionCSV } from './DownloadTransactionCSV'
import { TotalSettled } from './TotalSettled'
import { SettlementCard } from './SettlementCard'
import { Column } from 'react-table'
import { Pagination } from '../../../Components/Pagination/Pagination'
import { tequila } from '../../../api/tequila'
import { myst } from '../../../commons/mysts'
import { useFetch } from '../../../commons/hooks'
import { SETTLEMENT_LIST_RESPONSE_EMPTY } from '../../../constants/instances'
import dates from '../../../commons/dates'
import { cells } from '../../../Components/Table/cells'
import { media } from '../../../commons/media'
import { useMediaQuery } from 'react-responsive'
import { Placeholder } from './Placeholder'
import { Settlement } from 'mysterium-vpn-js'
import { TransactionCard } from './TransactionCard'
import { List } from '../../../Components/List/List'
import { Tooltip } from '../../../Components/Tooltip/Tooltip'
import styled from 'styled-components'

const { isDesktopQuery } = media
const { api } = tequila
const { date2human } = dates
const { PrimaryCell, SecondaryCell } = cells

const SpecializedRow = styled(LayoutRow)`
  > :nth-child(2) {
    flex-grow: 2;
  }
`

export const TransactionsPage = () => {
  const isDesktop = useMediaQuery(isDesktopQuery)
  const [state, setState] = useState(1)
  const handlePageChange = (page: number) => setState(page)

  const [data = SETTLEMENT_LIST_RESPONSE_EMPTY, loading] = useFetch(() => api.settlementHistory({ page: state }), [
    state,
  ])
  const noData = data.items.length === 0

  const Columns: Column<Settlement>[] = useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'settledAt',
        Cell: (c) => <PrimaryCell>{date2human(c.value)}</PrimaryCell>,
        minWidth: 50,
      },
      {
        Header: 'External Wallet Address',
        accessor: 'beneficiary',
        Cell: (c) => <SecondaryCell>{c.value}</SecondaryCell>,
        minWidth: 300,
      },
      {
        Header: 'Transaction ID',
        accessor: 'txHash',
        Cell: (c) => <SecondaryCell>{c.value}</SecondaryCell>,
        minWidth: 300,
      },
      {
        Header: () => (
          <>
            {'Fee'}
            <Tooltip content="This fee includes a 20% network fee plus blockchain transaction fees for settlement transactions." />
          </>
        ),
        accessor: 'fees',
        Cell: (c) => <PrimaryCell>{myst.display(c.value, { fractions: 3 })}</PrimaryCell>,
        minWidth: 50,
        maxWidth: 100,
      },
      {
        Header: 'Received amount',
        accessor: 'amount',
        Cell: (c) => <PrimaryCell>{myst.display(c.value, { fractions: 3 })}</PrimaryCell>,
        minWidth: 50,
        maxWidth: 100,
      },
    ],
    [],
  )

  return (
    <Layout logo={<TransactionsHeaderIcon />} title="Transactions">
      <SpecializedRow $variant={isDesktop ? 'hero' : 'plain'}>
        <TotalSettled />
        {isDesktop && <SettlementCard />}
        <DownloadTransactionCSV data={data} />
      </SpecializedRow>
      <LayoutRow data-test-id="TransactionsPage.tableContainer">
        {isDesktop && <Table noContent={<Placeholder />} columns={Columns} loading={loading} data={data.items} />}
        {!isDesktop && (
          <List
            items={data.items}
            mapper={(item) => <TransactionCard item={item} />}
            loading={loading}
            noContent={<Placeholder />}
          />
        )}
      </LayoutRow>
      <LayoutRow>
        {!noData && <Pagination currentPage={state} totalPages={data.totalPages} handlePageChange={handlePageChange} />}
      </LayoutRow>
    </Layout>
  )
}
