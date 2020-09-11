/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FC } from 'react';
import '../../assets/styles/pages/authenticated/main.scss';
import { Redirect, Route, Switch } from 'react-router-dom';

import { DASHBOARD, NOT_FOUND, SESSIONS, SETTINGS, WALLET } from '../../constants/routes';

import Dashboard from './Dashboard/Dashboard';
import Sessions from './Sessions/Sessions';
import Settings from './Settings/Settings';
import Wallet from './Wallet/Wallet';
import Navigation from './Components/Navigation';

const AuthenticatedPage: FC = () => {
    return (
        <div className="authenticated wrapper">
            <Navigation />
            <div className="authenticated--content-wrapper">
                <Switch>
                    <Route exact={true} path={DASHBOARD}>
                        <div className="authenticated--content">
                            <Dashboard />
                        </div>
                    </Route>
                    <Route exact={true} path={SESSIONS}>
                        <div className="authenticated--content">
                            <Sessions />
                        </div>
                    </Route>
                    <Route exact={true} path={SETTINGS}>
                        <div className="authenticated--content">
                            <Settings />
                        </div>
                    </Route>
                    <Route exact={true} path={WALLET}>
                        <div className="authenticated--content">
                            <Wallet />
                        </div>
                    </Route>
                    <Route path="*">
                        <Redirect to={NOT_FOUND} />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

export default AuthenticatedPage;