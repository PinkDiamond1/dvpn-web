/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { tequilapiClient } from '../../../api/TequilApiClient';
import Header from '../../../Components/Header';
import { GeneralState } from '../../../redux/actions/general';
import { RootState } from '../../../redux/store';
import '../../../assets/styles/pages/authenticated/pages/setings.scss';
import { ReactComponent as Logo } from '../../../assets/images/authenticated/pages/settings/logo.svg';

import MMN from './Components/MMN';
import PasswordChange from './Components/PasswordChange';
import IdentityBackup from './Components/IdentityBackup';
import {useSnackbar} from "notistack";
import {parseMessage} from "../../../commons/error.utils";

interface StateInterface {
    apiKey: string;
}

interface Props {
    general: GeneralState;
}

const mapStateToProps = (state: RootState) => ({
    general: state.general,
});

const Settings = ({ general }: Props): JSX.Element => {
    const [values, setValues] = React.useState<StateInterface>({
        apiKey: '',
    });

    const { currentIdentity } = general;
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        tequilapiClient
            .getMMNApiKey()
            .catch((err) => {
                enqueueSnackbar(parseMessage(err), { variant: 'error' })
                console.log(err);
            })
            .then((response: any) => {
                setValues({ ...values, apiKey: response.apiKey });
            });
    }, []);

    return (
        <div className="settings wrapper">
            <div className="settings--content">
                <Header logo={Logo} name="Settings" />
                <div className="settings--blocks">
                    <div className="settings--block identity">
                        <p className="heading">Identity</p>
                        <div className="content">
                            <IdentityBackup identity={currentIdentity?.id || ''} />
                        </div>
                    </div>

                    <div className="settings--block identity">
                        <p className="heading">WebUI security</p>
                        <div className="content">
                            <PasswordChange />
                        </div>
                    </div>

                    <div className="settings--block identity">
                        <p className="heading">MMN integration</p>
                        <div className="content">
                            <MMN apiKey={values.apiKey} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(mapStateToProps)(Settings);
