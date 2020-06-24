import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import City from './city';
import Country from './country';
import Location from './location';
import Department from './department';
import Employee from './employee';
import Job from './job';
import JobHistory from './job-history';
import Utilisateur from './utilisateur';
import Role from './role';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}city`} component={City} />
      <ErrorBoundaryRoute path={`${match.url}country`} component={Country} />
      <ErrorBoundaryRoute path={`${match.url}location`} component={Location} />
      <ErrorBoundaryRoute path={`${match.url}department`} component={Department} />
      <ErrorBoundaryRoute path={`${match.url}employee`} component={Employee} />
      <ErrorBoundaryRoute path={`${match.url}job`} component={Job} />
      <ErrorBoundaryRoute path={`${match.url}job-history`} component={JobHistory} />
      <ErrorBoundaryRoute path={`${match.url}utilisateur`} component={Utilisateur} />
      <ErrorBoundaryRoute path={`${match.url}role`} component={Role} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
