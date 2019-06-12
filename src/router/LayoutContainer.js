import * as React from 'react';
import { Layout, Icon, Breadcrumb } from 'antd';
import { connect } from 'dva';
import { routerRedux, withRouter, Link } from 'dva/router';
import LayoutMenu from 'components/menu/Menu';
import LayoutSubMenu from 'components/menu/SubMenuList';
// import { routers } from 'router';
import layoutStyle from './layout.less';

const { Header, Footer, Sider, Content } = Layout;

const routes = [
  {
    path: 'index',
    breadcrumbName: 'home',
  },
  {
    path: 'second',
    breadcrumbName: 'second',
  },
];

function itemRender(route, params, routes, paths) {
  const last = routes.indexOf(route) === routes.length - 1;
  return last ? <span>{route.name}</span> : <Link to={route.path}>{route.name}</Link>;
}

class LayoutContainer extends React.Component {
  state = {
    showSubMenu: false,
    mouseEnterMenuKey: '',
    selectedMenuKey: '',
    selectedSubMenuItemKey: '',
  };

  subMenuMouseEnter = false;

  menuMouseEnter = false;

  componentDidMount() {
    const { dispatch, location, match } = this.props;
    dispatch({
      type: 'global/initGlobel',
      payload: {
        location,
        match,
      },
    });
  }

  render() {
    const { menus, children, initMenuKey, initSubMenuItemKey, breadcrumbData } = this.props;
    console.log(initMenuKey, initSubMenuItemKey, breadcrumbData);
    const { showSubMenu, mouseEnterMenuKey, selectedMenuKey, selectedSubMenuItemKey } = this.state;
    return (
      <Layout style={{ height: '100%' }}>
        <Sider width="89" style={{ backgroundColor: '#0e4780' }}>
          <div onMouseLeave={this.handleMenuMouseLeave} onMouseEnter={this.handleMenuMouseEnter}>
            <LayoutMenu
              menus={menus}
              menuProps={{ selectable: false, className: layoutStyle.menu }}
              menuItemProps={{
                onMouseEnter: this.handleMenuItemMouseEnter,
              }}
            />
          </div>
        </Sider>
        <Layout>
          <Sider
            className={layoutStyle.subMenuWrapper}
            style={{
              display: mouseEnterMenuKey || selectedMenuKey || initMenuKey ? 'block' : 'none',
            }}
            onMouseLeave={this.handleSubMenuMouseLeave}
            onMouseEnter={this.handleSubMenuMouseEnter}
          >
            <LayoutSubMenu
              menus={menus}
              selectedMenuKey={mouseEnterMenuKey || selectedMenuKey || initMenuKey}
              selectedSubMenuItemKey={selectedSubMenuItemKey || initSubMenuItemKey}
              menuProps={{ onClick: this.handleSubMenuClick }}
            />
          </Sider>
          <Layout>
            <Header style={{ backgroundColor: '#fff', padding: 0, margin: 0 }}>
              <div className={layoutStyle.innerHeader}>
                <div className={layoutStyle.operate}>
                  <Icon type="menu-fold" />
                </div>
                <Breadcrumb itemRender={itemRender} routes={breadcrumbData} />
              </div>
            </Header>
            <Content>{children}</Content>
            <Footer className={layoutStyle.footer}>
              <span>Copyright</span>
              <Icon type="copyright" />
              <span>天虹数字化经营中心技术中心出品</span>
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }

  handleSubMenuMouseEnter = () => {
    // console.log('handleSubMenuMouseEnter', +new Date());
    this.subMenuMouseEnter = true;
  };

  handleMenuMouseEnter = () => {
    // console.log('handleMenuMouseEnter', +new Date());
    this.menuMouseEnter = true;
  };

  handleMenuItemMouseEnter = e => {
    // console.log('handleMenuItemMouseEnter', +new Date());
    this.setState({
      mouseEnterMenuKey: e.key,
      showSubMenu: true,
    });
    e.domEvent.stopPropagation();
  };

  handleMenuMouseLeave = () => {
    // console.log('handleMenuMouseLeave', +new Date());
    this.menuMouseEnter = false;
    setTimeout(() => {
      if (!this.subMenuMouseEnter) {
        const { selectedMenuKey } = this.state;
        if (selectedMenuKey) {
          this.setState({
            mouseEnterMenuKey: '',
            showSubMenu: true,
          });
        }
      }
    });
  };

  handleSubMenuMouseLeave = () => {
    // console.log('handleSubMenuMouseLeave', +new Date());
    this.subMenuMouseEnter = false;
    setTimeout(() => {
      if (!this.menuMouseEnter) {
        const { selectedMenuKey } = this.state;
        if (selectedMenuKey) {
          this.setState({
            mouseEnterMenuKey: '',
            showSubMenu: true,
          });
        } else {
          this.setState({
            showSubMenu: false,
          });
        }
      }
    });
  };

  handleSubMenuClick = ({ key, keyPath, url }) => {
    const { dispatch, urlMap, location, menus } = this.props;
    const menuKey = keyPath[keyPath.length - 1];
    const { pathname } = location;
    const path = urlMap.get(url)
    const menu = menus[path[2]].children[path[1]].children[path[0]];
    this.setState({
      selectedMenuKey: menuKey,
      selectedSubMenuItemKey: key,
    });
    dispatch(routerRedux.push(url));
    dispatch({
      type: 'global/setRoutes',
      payload: [{ path: pathname, name: menu.name }],
    });
  };
}
// initMenuKey: '',  // 初始化主菜单选择项
//     initSubMenuItemKey: '', // 初始化子菜单选中项
//     routes: [], // 面包屑数据
export default withRouter(
  connect(({ global = {} }) => {
    
    return {
      menus: global.menus,
      urlMap: global.urlMap,
      initMenuKey: global.initMenuKey,
      initSubMenuItemKey: global.initSubMenuItemKey,
      breadcrumbData: global.routes,
    };
  })(LayoutContainer)
);
