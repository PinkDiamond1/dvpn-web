/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled, { css } from 'styled-components'
import { Button } from '../Inputs/Button'
import { themeCommon } from '../../theme/themeCommon'
import { usePagination, DOTS } from './usePagination'

export interface PaginationState {
  page: number
  pageSize?: number
}
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px 10px;
`
const activeCSS = css`
  background: ${themeCommon.colorGrayBlue}51;
  cursor: not-allowed;
`
const PageButton = styled.button<Props>`
  height: 32px;
  width: 32px;
  border-radius: 50%;
  color: ${({ theme }) => theme.common.colorGrayBlue};
  background: none;
  border: 1px solid ${({ theme }) => theme.common.colorGrayBlue};
  :hover {
    cursor: pointer;
  }
  :active {
    background: ${themeCommon.colorGrayBlue}51;
  }
  :disabled {
    background: ${themeCommon.colorGrayBlue}51;
  }
  ${({ $active }) => $active && activeCSS}
`
const Pages = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`
interface Props {
  onClick?: () => void
  $active: boolean
}
export interface PaginationProps {
  currentPage: number
  totalPages: number
  handlePageChange: (page: PaginationState) => void
}
// TODO: Rinse logic for displaying active page

export const Pagination = ({ currentPage, totalPages, handlePageChange }: PaginationProps) => {
  const paginationRange = usePagination({ currentPage, totalPages })

  return (
    <Container>
      <Button
        variant="outlined"
        label="Prev"
        rounded
        onClick={() => {
          // Rethink else call
          currentPage - 1 >= 1 && handlePageChange({ page: currentPage - 1 })
        }}
      />
      <Pages>
        {paginationRange?.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return <span>{DOTS}</span>
          }
          return (
            <PageButton
              $active={currentPage === pageNumber}
              onClick={() => {
                handlePageChange({ page: pageNumber as number })
              }}
            >
              {pageNumber}
            </PageButton>
          )
        })}
      </Pages>
      <Button
        variant="outlined"
        label="Next"
        rounded
        onClick={() => {
          // Rethink else call
          currentPage + 1 <= totalPages && handlePageChange({ page: currentPage + 1 })
        }}
      />
    </Container>
  )
}