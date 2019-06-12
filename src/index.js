// import '@babel/polyfill';
import 'url-polyfill';
import dva from 'dva';

// user BrowserHistory
import createLoading from 'dva-loading';
// import createHistory from "history/createBrowserHistory";
import * as history from 'history';

import 'moment/locale/zh-cn';
import global from 'models/global'
import router from './router'
import 'normalize.css'

const createHistory = history.createBrowserHistory;
// import 'common.css'
// import './rollbar';

// import './index.less';
// import './components/lib/styles/index.less';

// 1. Initialize
const app = dva({
  history: createHistory({
  }),
});
// 2. Plugins
app.use(createLoading());

// 3. Register global model
app.model(global);

// 4. Router

app.router(router);

// 5. Start
app.start('#root');
