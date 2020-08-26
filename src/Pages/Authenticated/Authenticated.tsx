import React from 'react';
import '../../assets/styles/pages/authenticated/main.scss';
import { Redirect, Route, Switch } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { onboard } from '../../redux/actions/onboarding/onboard';
import { connect } from 'react-redux';
import { DASHBOARD, NOT_FOUND, SESSIONS, SETTINGS, WALLET } from '../../constants/routes';
import Dashboard from './Pages/Dashboard/Dashboard';
import Sessions from './Pages/Sessions/Sessions';
import Settings from './Pages/Settings/Settings';
import Wallet from './Pages/Wallet/Wallet';
import Navigation from './Components/Navigation';

const mapStateToProps = (state: RootState) => ({
    onboarded: state.onboarding.isDefaultCredentials,
});

const mapDispatchToProps = { onboard };
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const Authenticated: React.FC<Props> = (props) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(Authenticated);
