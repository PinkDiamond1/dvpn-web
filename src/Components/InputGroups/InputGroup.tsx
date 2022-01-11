/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import styles from './InputGroup.module.scss'

interface Props {
  label?: string
  help?: string
  children?: any
  topRight?: JSX.Element
}

export const InputGroup = ({ label, help, children, topRight }: Props) => {
  return (
    <div className={styles.group}>
      <p className={styles.label}>
        {label}
        {topRight && topRight}
      </p>
      {children}
      {help && <p className={styles.help}>{help}</p>}
    </div>
  )
}
