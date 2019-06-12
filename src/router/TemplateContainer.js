import React from 'react';
import { Route, Switch } from 'dva/router';
import { connect } from 'dva';

class TemplateContainer extends React.PureComponent {
  componentDidMount() {
    const { routes, dispatch, match, location } = this.props;
    const { url } = match;
    const { pathname } = location;
    if (url !== pathname) {
      const path = pathname.replace(url, '');
      const route = routes.find(route => route.path === path);
      if (route) {
        dispatch({
          type: 'global/setInitOperateRoute',
          payload: {
            subMenuItemPath: url,
            url: pathname,
            route,
          },
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { routes, dispatch, match, location, urlMap, menus } = this.props;
    if (prevProps.location.pathname !== location.pathname) {
      const { url } = match;
      const { pathname } = location;
      const path = urlMap.get(url);
      const menu = menus[path[2]].children[path[1]].children[path[0]];
      if (url !== pathname) {
        const routePath = pathname.replace(url, '');
        const route = routes.find(route => route.path === routePath);
        dispatch({
          type: 'global/setRoutes',
          payload: [{ path: url, name: menu.name }, { path: pathname, name: route.name }],
        });
    } else {
      dispatch({
        type: 'global/setRoutes',
        payload: [{ path: url, name: menu.name }],
      });
    }
      // dispatch()
    }
    console.log('componentDidUpdate', this.props, prevProps, prevState);
  }

  render() {
    const { routes, match, app } = this.props;
    const RouteComponent = route => routeProps => {
      return <route.component {...routeProps} routes={route.routes} app={app} />;
    };
    const RouteComponentList = routes.map(route => {
      return (
        <Route
          {...route}
          key={`${match.url}${route.path}`}
          path={`${match.url}${route.path}`}
          component={RouteComponent(route)}
        />
      );
    });
    // 404组件
    const NofFound = () => <h1>NotFound</h1>;
    return (
      <div className="template">
        <Switch>
          {RouteComponentList}
          <Route component={NofFound} />
        </Switch>
      </div>
    );
  }
}

export default connect(({ global }) => {
  return { menus: global.menus, urlMap: global.urlMap };
})(TemplateContainer);
