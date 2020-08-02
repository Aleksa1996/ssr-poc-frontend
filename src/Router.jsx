import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { v4 } from 'uuid';

import Home from './client/Pages/Home/Home';

export const routes = [
  {
    id: v4(),
    path: '/',
    link: '/',
    component: Home,
    exact: true
  }
];

const Router = (props) => {
  return (
    <Switch location={props.location}>
      {routes.map((r, id) => (
        <Route key={id} exact path={r.path} component={r.component} />
      ))}
    </Switch>
  );
};
export default Router;
