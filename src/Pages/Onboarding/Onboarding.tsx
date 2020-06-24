import React from "react";
import "../../assets/styles/pages/onboarding/main.scss"
import Welcome from "./Steps/Welcome";
import TermsAndConditions from "./Steps/TemsAndConditions";
import Backup from "./Steps/Backup";
import ServiceSettings from "./Steps/ServiceSettings";
import NodeSettings from "./Steps/NodeSettings";
import {Route, Switch} from "react-router-dom";
import sideImage from '../../assets/images/onboarding/SideImage.png';

const Onboarding = () => {
  return (
    <div className="onboarding wrapper">
      <div className="steps">
        <Switch>
          <Route exact={true}  path={`/onboarding`} component={Welcome}/>
          <Route exact={true}  path={`/onboarding/terms-and-conditions`} component={TermsAndConditions}/>
          <Route exact={true}  path={`/onboarding/service-settings`} component={ServiceSettings}/>
          <Route exact={true}  path={`/onboarding/backup`} component={Backup}/>
          <Route exact={true}  path={`/onboarding/node-settings`} component={NodeSettings}/>
        </Switch>
      </div>
      <div className="side">
        <img src={sideImage}/>
      </div>
    </div>
  )
};

export default Onboarding;