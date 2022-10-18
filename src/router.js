import React from 'react';
import { Redirect, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic'
import { routerRedux } from 'dva/router';
import App from './routes/app'
const { ConnectedRouter } = routerRedux
// import Index from './routes/index'

function RouterConfig({ history, app }) {
  const routes = [
    {
      path: '/',
      models: [() => import('./models/index')],
      component: () => import('./routes/app')
    },
    {
      path: '/login',
      models: [() => import('./models/login')],
      component: () => import('./routes/login/login')
    },
    {
      path: '/chat',
      models: [() => import('./models/chat')],
      component: () => import('./routes/chat/chat')
    }
  ]
  return (
    <ConnectedRouter history={history} >
      <App>
        <Switch>
          <Route path='/' exact render={() => (<Redirect to='/chat' />)}  />
          {
            routes.map(({path, ...dynamics}, key) => (
              <Route path={path} exact component={dynamic({app, ...dynamics})} key={key} />
            ))
          }
        </Switch>
      </App>
    </ConnectedRouter>
    
  );
}

export default RouterConfig;
