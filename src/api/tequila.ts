/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { AxiosAdapter, TequilapiClient, TequilapiClientFactory } from 'mysterium-vpn-js'
import { DEFAULT_PASSWORD, DEFAULT_USERNAME } from '../constants/defaults'

import qs from 'qs'
import { AxiosInstance } from 'axios'
import errorInterceptors from './error.interceptors'

const buildAxios = (): AxiosInstance => {
  const instance = new TequilapiClientFactory(
    `${window.location.protocol}//${window.location.hostname}:${window.location.port}/tequilapi`,
    20_000,
  ).axiosInstance()

  instance.interceptors.request.use((config) => {
    config.paramsSerializer = (params) => {
      return qs.stringify(params, { arrayFormat: 'repeat' }) // arrays will be serialized as: ?types=1&types=2...
    }

    return config
  }, errorInterceptors.buildLogError('request'))

  instance.interceptors.response.use((response) => response, errorInterceptors.buildLogError('response'))

  return instance
}

const http = buildAxios()

const tequilaClient: TequilapiClient = new TequilapiClient(new AxiosAdapter(http, 20_000))

const loginWithDefaultCredentials = async (): Promise<boolean> => {
  try {
    await tequilaClient.authLogin({ username: DEFAULT_USERNAME, password: DEFAULT_PASSWORD })
    return true
  } catch (e) {
    return false
  }
}

const isUserAuthenticated = async (): Promise<boolean> => {
  try {
    await tequilaClient.identityList()
  } catch (e) {
    return false
  }

  return true
}

const stopAllServices = async () => {
  const services = await tequilaClient.serviceList({ includeAll: true })
  await Promise.all(services.filter((s) => s.status === 'Running').map((s) => tequilaClient.serviceStop(s.id!)))
}

const startAllServices = async (identity: string) => {
  const services = await tequilaClient.serviceList({ includeAll: true })
  await Promise.all(
    services
      .filter((s) => s.status === 'NotRunning')
      .map((s) =>
        tequilaClient.serviceStart({
          providerId: identity,
          type: s.type,
        }),
      ),
  )
}

const restartRunningServices = async (identity: string) => {
  const services = await tequilaClient.serviceList({ includeAll: true })
  const running = services.filter((s) => s.status === 'Running')

  await Promise.all(running.map((s) => tequilaClient.serviceStop(s.id!)))
  await Promise.all(
    running.map((s) =>
      tequilaClient.serviceStart({
        providerId: identity,
        type: s.type,
      }),
    ),
  )
}

export const tequila = {
  api: tequilaClient,
  http,
  loginWithDefaultCredentials,
  isUserAuthenticated,
  startAllServices,
  stopAllServices,
  restartRunningServices,
}
