import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import AppList from "./routes/AppList";
import AppDetail from "./routes/AppDetail";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/app-list" component={AppList} />
      <Route path="/app-detail" component={AppDetail} />
    </Router>
  );
}

export default RouterConfig;
