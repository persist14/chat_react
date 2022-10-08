import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic'
// import Index from './routes/index'

function RouterConfig({ history, app }) {
  const routes = [
    {
      path: '/',
      models: [() => import('./models/index')],
      component: () => import('./routes/index')
    },
    {
      path: '/login',
      models: [() => import('./models/login')],
      component: () => import('./routes/login')
    }
  ]
  return (
    <Router history={history}>
      <Switch>
        {
          routes.map(({path, ...dynamics}, key) => (
            <Route path={path} exact component={dynamic({app, ...dynamics})} key={key} />
          ))
        }
      </Switch>
    </Router>
  );
}

export default RouterConfig;
