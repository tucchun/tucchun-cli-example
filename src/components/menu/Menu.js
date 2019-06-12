import * as React from 'react';
import { Menu } from 'antd';

class LayoutMenu extends React.PureComponent {

  render() {
    const { menus, menuItemProps, menuProps } = this.props;
    const MenuComponentList = menus.map((menu) => {
      return (
        <Menu.Item {...menuItemProps} key={menu.menuKey}>{menu.name}</Menu.Item>
      );
    });
    return (
      <Menu style={{width: 89}} {...menuProps}>
        {MenuComponentList}
      </Menu>
    );
  }
}

export default LayoutMenu;
