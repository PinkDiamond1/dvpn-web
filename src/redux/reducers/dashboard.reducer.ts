/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { DashboardState, DashboardTypes } from '../actions/dashboard/dashboard.d';
import { SESSION_FETCH_FULFILLED } from '../actionTypes/DashboardTypes';

const INITIAL_STATE: DashboardState = {
    sessions: {
        loading: true,
        sessions: [],
    },
};

function dashboardReducer(state: DashboardState = INITIAL_STATE, action: DashboardTypes): DashboardState {
    switch (action.type) {
        case SESSION_FETCH_FULFILLED: {
            return {
                ...state,
                sessions: {
                    loading: false,
                    sessions: action.payload,
                },
            };
        }
        default:
            return state;
    }
}

export default dashboardReducer;