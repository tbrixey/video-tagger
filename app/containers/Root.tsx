import React from 'react';
import { Router } from 'react-router';
import { hot } from 'react-hot-loader/root';
import { History } from 'history';
import Routes from '../Routes';

type Props = {
  history: History;
};

const Root = ({ history }: Props) => (
  <Router history={history}>
    <Routes />
  </Router>
);

export default hot(Root);
