/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import CheckIcon from '@material-ui/icons/Check'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { tequila } from '../../../../api/wrapped-calls'
import { configParser } from '../../../../commons/config'
import FEATURES from '../../../../commons/features'
import Button from '../../../../Components/Buttons/Button'
import { selectors } from '../../../../redux/selectors'
import styles from './FeatureToggle.module.scss'

export const FeatureToggle = () => {
  const { setFeatures } = tequila
  const config = useSelector(selectors.configSelector)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const toggle = async (name: string) => {
    setIsLoading(true)
    const isEnabled = configParser.isFeatureEnabled(config, name)
    const enabledFeatures = configParser.uiFeatures(config)

    try {
      if (isEnabled) {
        await setFeatures(enabledFeatures.filter((f) => f !== name))
      } else {
        await setFeatures([...enabledFeatures, name])
      }
    } finally {
      setIsLoading(false)
    }
  }

  const featureList = Object.keys(FEATURES).map((f) => {
    const feature = FEATURES[f]
    const isEnabled = configParser.isFeatureEnabled(config, feature.name)
    return (
      <div key={feature.name} className={styles.feature}>
        <div className={styles.enabled}>{isEnabled && <CheckIcon />}</div>
        <div className={styles.info}>
          <p className={styles.name}>{feature.name}</p>
          <p className={styles.description}>{feature.description}</p>
        </div>
        <Button onClick={() => toggle(feature.name)} isLoading={isLoading} extraStyle="outline">
          Toggle
        </Button>
      </div>
    )
  })

  return <div className={styles.features}>{featureList}</div>
}
