// import { find } from 'lodash'
// import { getGlobalData } from 'services';
import { parseMenuUrlMap } from 'utils/base';

const global = {
  namespace: 'global',
  state: {
    id: 0,
    account: '',
    mobile: '',
    email: '',
    realName: '',
    gender: 0,
    status: 0,
    headIcon: '',
    jobNum: '',
    deptCode: '',
    dept: '',
    positionId: 0,
    platform: 0,
    acceptMsg: 0,
    position: '',
    jobStatus: 0,
    userStores: [],
    globalKeys: [],
    roles: [],
    menus: [],
    applications: [],
    pk: '',
    urlMap: new Map(),
    initOperateRoute: {},
    initMenuKey: '', // 初始化主菜单选择项
    initSubMenuItemKey: '', // 初始化子菜单选中项
    routes: [], // 面包屑数据
  },
  reducers: {
    init(state, { payload: globalData }) {
      return { ...state, ...globalData };
    },
    initUrlMap(state, { payload: urlMap }) {
      return {
        ...state,
        urlMap,
      };
    },
    setSelectMenuKey(
      state,
      {
        payload: { menuKey, subMenuItemKey },
      }
    ) {
      return { ...state, initMenuKey: menuKey, initSubMenuItemKey: subMenuItemKey };
    },
    setRoutes(state, { payload: routes }) {
      return { ...state, routes: [...routes] };
    },
    setInitOperateRoute(state, { payload: initOperateRoute }) {
      return { ...state, initOperateRoute };
    },
  },
  effects: {
    *initGlobel(
      {
        payload: { location },
      },
      { put, select }
    ) {
      const result = yield import('rss/global.json');
      if (result.code === 200) {
        const initOperateRoute = yield select(state => {
          const global = state.global || {}
          return global.initOperateRoute;
        });
        const routes = [];
        const { pathname } = location;
        const urlMap = parseMenuUrlMap(result.data.menus || []);
        const { menus } = result.data;
        const path = urlMap.get(pathname) || urlMap.get(initOperateRoute.subMenuItemPath);
        let initMenuKey = '';
        let initSubMenuItemKey = '';
        if (path) {
          initMenuKey = menus[path[2]].menuKey;
          const initSubMenuItem = menus[path[2]].children[path[1]].children[path[0]];
          initSubMenuItemKey = initSubMenuItem.menuKey;
          routes.push({
            path: initSubMenuItem.url,
            name: initSubMenuItem.name,
          });
        }
        if (initOperateRoute.route) {
          routes.push({
            path: initOperateRoute.url,
            name: initOperateRoute.route.name,
          });
        }
        yield put({
          type: 'init',
          payload: { ...result.data, urlMap, initMenuKey, initSubMenuItemKey, routes },
        });
      }
    },
  },
};

export default global;
