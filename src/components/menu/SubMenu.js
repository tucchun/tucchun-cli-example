import * as React from 'react';
import { Menu } from 'antd';

const { SubMenu } = Menu;
class SubMenuComponent extends React.PureComponent {

  constructor(props) {
    super(props);
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  static defaultProps = {
    onMouseEnter() {},
    onMouseleave() {},
  };

  menuItemPathMap = new Map()

  handleMenuClick(e) {
    const {parentKey, menus, menuProps} = this.props
    const {keyPath} = e
    const menuItemPath = this.menuItemPathMap.get(e.key)
    const selectedMenu = menus[menuItemPath[1]].children[menuItemPath[0]]
    // const selectedParentMenu = menus.find(menu => menu.menuKey === keyPath[1]) || ({} as IMenu)
    // const selectedMenu = selectedParentMenu.children.find(menu => menu.menuKey === keyPath[0]) || ({} as IMenu)
    const param = {...e, url: selectedMenu.url}
    keyPath.push(parentKey)
    menuProps.onClick(param);
  }

  render() {
    const {
      menus,
      menuProps,
      subMenuProps,
      menuItemProps,
      parentKey,
      selectedMenuKey,
      selectedSubMenuItemKey,
    } = this.props;
    const openKeys = [];
    // const tree = []
    const MenuComponentList = menus.map((menu, index) => {
      const SubMenuComponentList = menu.children.map((menu, subindex) => {
        this.menuItemPathMap.set(menu.menuKey, [subindex, index])
        return (
          <Menu.Item key={menu.menuKey} {...menuItemProps}>
            {menu.name}
          </Menu.Item>
        );
      });
      openKeys.push(menu.menuKey);
      return (
        <SubMenu
          {...subMenuProps}
          key={menu.menuKey}
          title={
            <span>
              <span>{menu.name}</span>
            </span>
          }
        >
          {SubMenuComponentList}
        </SubMenu>
      );
    });
    return (
      <Menu
        mode='inline'
        {...menuProps}
        onClick={this.handleMenuClick}
        key={parentKey}
        style={{ display: parentKey ===  selectedMenuKey ? 'block' : 'none' }}
        selectedKeys={[selectedSubMenuItemKey]}
        defaultOpenKeys={openKeys}
      >
        {MenuComponentList}
      </Menu>
    );
  }
}

export default SubMenuComponent;
