import React from 'react';
import { Route, routerRedux, Switch } from 'dva/router';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/es/locale-provider/zh_CN';
// import dynamic from 'dva/dynamic';
import marketingRouteConfig from 'marketing';
import GoodsRouteConfig from 'goods';
import LayoutContainer from './LayoutContainer';
import TemplateContainer from './TemplateContainer';

// const marketingRouteConfig = require('/marketing')
const { ConnectedRouter } = routerRedux;
const routers = [];
let routeConfig;
routers.push(marketingRouteConfig);
routers.push(GoodsRouteConfig);
// function importAll(r) {
//   r.keys().forEach(key => routers.push(r(key).default || r(key)));
// }
// importAll(require.context('./', true, /router\.js$/));
// importAll(require.context('../pages', true, /router\.js$/));
// dynamic.setDefaultLoadingComponent(() => {
//   return <Spin size="large" />;
// });

export { routers };

/**
 *
 * 路由配置
 * @export
 * @param {{app: DvaInstance, history: History}} { app, history }
 * @returns
 */
export default function RouterIndex({ app, history }) {
  // 路由组件
  const RouteComponent = (RouteConfig) => (props) => (
    <RouteConfig.component {...props} routes={RouteConfig.routes} app={app} />
  );
  // 路由列表组件
  const routes = routers.map((route) => {
    routeConfig = route({ app, Template: TemplateContainer });
    return (
      <Route {...routeConfig} key={routeConfig.path} path={routeConfig.path} component={RouteComponent(routeConfig)} />
    );
  });
  // 404组件
  const NofFound = () => <h1>NotFound</h1>;
  return (
    <LocaleProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <LayoutContainer>
          <Switch>
            {routes}
            <Route component={NofFound} />
          </Switch>
        </LayoutContainer>
      </ConnectedRouter>
    </LocaleProvider>
  );
}
