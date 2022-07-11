/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useAppSelector } from '../../../../../commons/hooks'
import { selectors } from '../../../../../redux/selectors'
import calls from '../../../../../commons/calls'
import { tequila } from '../../../../../api/tequila'
import { Right } from './Right'
import { useEffect, useState } from 'react'
import { configs } from '../../../../../commons/config'
import { SettingsCard } from '../../SettingsCard'
import { InputGroup } from '../../../../../Components/Inputs/InputGroup'
import { TextField } from '../../../../../Components/Inputs/TextField'
import { Config } from 'mysterium-vpn-js'

export interface AdvancedSettingsForms {
  udpRange: string
  l2RPCurls: string
  stunServerURLS: string
  traversals: string
}

const INITIAL_FORM: AdvancedSettingsForms = {
  udpRange: '',
  l2RPCurls: '',
  stunServerURLS: '',
  traversals: '',
}

const rpcl2UrlsWithoutDefaults = (config: Config, defaultConfig: Config): string[] => {
  const all = configs.rpcl2(config)
  const defaults = configs.rpcl2(defaultConfig)

  return all.filter((u) => !defaults.includes(u))
}

export const AdvancedSettings = () => {
  const [form, setForm] = useState<AdvancedSettingsForms>(INITIAL_FORM)
  const [loading, setLoading] = useState<boolean>(false)

  const config = useAppSelector(selectors.configSelector)
  const defaultConfig = useAppSelector(selectors.defaultConfigSelector)

  useEffect(() => {
    setForm((p) => ({
      ...p,
      udpRange: configs.udpPorts(config),
      l2RPCurls: rpcl2UrlsWithoutDefaults(config, defaultConfig).join(','),
      stunServerURLS: configs.stunServers(config).join(','),
    }))
  }, [])

  const rpcl2UrlsWithDefaults = (): string[] => {
    const rpcl2 = form.l2RPCurls.length > 0 ? form.l2RPCurls.split(',') : []
    return [...rpcl2, ...defaultData['ether.client.rpcl2']]
  }

  const defaultData = {
    'stun-servers': configs.stunServers(defaultConfig),
    'udp.ports': configs.udpPorts(defaultConfig),
    traversal: configs.natTraversals(defaultConfig),
    'ether.client.rpcl2': configs.rpcl2(defaultConfig),
  }

  const data = {
    'stun-servers': form.stunServerURLS.split(','),
    'udp.ports': form.udpRange,
    traversal: form.traversals,
    'ether.client.rpcl2': rpcl2UrlsWithDefaults(),
  }

  const handleUDPRangeChange = (udpRange: string) => setForm((p) => ({ ...p, udpRange }))
  const handleL2RPCurlsChange = (l2RPCurls: string) => setForm((p) => ({ ...p, l2RPCurls }))
  const handleStunServersChange = (stunServerURLS: string) => setForm((p) => ({ ...p, stunServerURLS }))

  const handleChangeRight = (traversals: string) => setForm((p) => ({ ...p, traversals }))

  const handleSave = async () => {
    setLoading(true)
    await calls.tryTo(() => tequila.setUserConfig(data), { success: 'Settings saved' })
    setLoading(false)
  }
  return (
    <>
      <SettingsCard loading={loading} title="Advanced Settings">
        <InputGroup
          title="UDP Port range"
          input={<TextField value={form.udpRange} onChange={handleUDPRangeChange} />}
        />
        <InputGroup
          title="L2 RPC URLs (Requires NODE restart)"
          input={<TextField value={form.l2RPCurls} onChange={handleL2RPCurlsChange} />}
        />
        <InputGroup
          title="Stun Servers"
          input={<TextField value={form.stunServerURLS} onChange={handleStunServersChange} />}
        />
      </SettingsCard>
      <Right loading={loading} form={form} onChange={handleChangeRight} handleSave={handleSave} />
      {/*      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>{data['stun-servers']}</div>
        <div>{data['udp.ports']}</div>
        <div>{data['ether.client.rpcl2']}</div>
        <div>{data.traversal}</div>
      </div>*/}
    </>
  )
}