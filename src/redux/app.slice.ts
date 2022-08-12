/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { createSlice } from '@reduxjs/toolkit'
import {
  BeneficiaryTxStatus,
  ChainSummary,
  FeesResponse,
  IdentityBeneficiaryResponse,
  IdentityRef,
  NodeHealthcheck,
} from 'mysterium-vpn-js'
import { Config } from 'mysterium-vpn-js/lib/config/config'
import { BENEFICIARY_TX_STATUS_EMPTY, FEES_RESPONSE_EMPTY, HEALTHCHECK_EMPTY } from '../constants/instances'

export interface Auth {
  authenticated: boolean
  withDefaultCredentials: boolean
}

export interface Terms {
  acceptedVersion: string | undefined
}

export interface Onboarding {
  needsAgreedTerms: boolean
  needsPasswordChange: boolean
  needsRegisteredIdentity: boolean
  needsOnBoarding: boolean
}

export interface AppState {
  loading: boolean
  currentIdentityRef?: IdentityRef
  auth: Auth
  terms: Terms
  config: Config
  defaultConfig: Config
  fees: FeesResponse
  chainSummary: ChainSummary
  beneficiary: IdentityBeneficiaryResponse
  beneficiaryTxStatus: BeneficiaryTxStatus
  healthCheckResponse: NodeHealthcheck
}

const INITIAL_STATE: AppState = {
  loading: true,
  auth: {
    authenticated: false,
    withDefaultCredentials: false,
  },
  terms: {
    acceptedVersion: undefined,
  },
  fees: FEES_RESPONSE_EMPTY,
  config: {
    data: {},
  },
  defaultConfig: {
    data: {},
  },
  chainSummary: {
    chains: {
      [-1]: 'Unknown',
    },
    currentChain: -1,
  },
  beneficiary: {
    beneficiary: '',
    isChannelAddress: false,
  },
  beneficiaryTxStatus: BENEFICIARY_TX_STATUS_EMPTY,
  healthCheckResponse: HEALTHCHECK_EMPTY,
}

const slice = createSlice({
  name: 'app',
  initialState: INITIAL_STATE,
  reducers: {
    updateAuthenticatedStore: (state, action) => {
      state.auth = action.payload
    },
    updateIdentityRefStore: (state, action) => {
      state.currentIdentityRef = action.payload
    },
    updateTermsStore: (state, action) => {
      state.terms = action.payload
    },
    updateLoadingStore: (state, action) => {
      state.loading = action.payload
    },
    updateConfigStore: (state, action) => {
      state.config = action.payload
    },
    updateFeesStore: (state, action) => {
      state.fees = action.payload
    },
    updateChainSummaryStore: (state, action) => {
      state.chainSummary = action.payload
    },
    updateBeneficiaryStore: (state, action) => {
      state.beneficiary = action.payload
    },
    updateDefaultConfigStore: (state, action) => {
      state.defaultConfig = action.payload
    },
    updateBeneficiaryTxStatusStore: (state, action) => {
      state.beneficiaryTxStatus = action.payload
    },
    updateHealthCheckResponseStore: (state, action) => {
      state.healthCheckResponse = action.payload
    },
  },
})

export const {
  updateAuthenticatedStore,
  updateIdentityRefStore,
  updateTermsStore,
  updateLoadingStore,
  updateConfigStore,
  updateDefaultConfigStore,
  updateFeesStore,
  updateChainSummaryStore,
  updateBeneficiaryStore,
  updateBeneficiaryTxStatusStore,
  updateHealthCheckResponseStore,
} = slice.actions

export default slice.reducer
