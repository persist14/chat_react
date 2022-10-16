import dva from 'dva';
import './assets/index.scss';
import 'antd/dist/antd.css';
import { createBrowserHistory } from 'history'
import models from './models/app'
// 1. Initialize
const app = dva({
  history: createBrowserHistory()
});

// 2. Plugins
// app.use({});

// 3. Model
models(app);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');

export default app._store
