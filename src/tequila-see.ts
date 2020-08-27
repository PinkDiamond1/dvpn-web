/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { EventEmitter } from 'events';

import { parseSSEResponse, TEQUILAPI_SSE_URL } from 'mysterium-vpn-js';

export const eventBus = new EventEmitter();

export const sseConnect = (): EventSource => {
    const es = new EventSource(TEQUILAPI_SSE_URL);
    es.onerror = (evt): void => {
        console.log('[sse error]', evt);
    };
    es.onmessage = (evt): void => {
        const { type, payload } = parseSSEResponse(evt.data);
        console.log('[sse message event]', type, JSON.stringify(payload, null, 2));
        eventBus.emit(type, payload);
    };
    return es;
};
