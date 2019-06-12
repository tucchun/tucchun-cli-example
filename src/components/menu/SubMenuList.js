import * as React from 'react';
import SubMenuComponent from 'components/menu/SubMenu';

class LayoutSubMenu extends React.PureComponent {

  static defaultProps = {
    onMouseEnter() {},
    onMouseleave() {},
  };

  render() {
    const {
      menus,
      menuProps,
      subMenuProps,
      menuItemProps,
      selectedMenuKey,
      selectedSubMenuItemKey,
    } = this.props;
    return (
      <div>
        {menus.map(menu => (
          <SubMenuComponent
            selectedMenuKey={selectedMenuKey}
            selectedSubMenuItemKey={selectedSubMenuItemKey}
            subMenuProps={subMenuProps}
            menuProps={menuProps}
            menuItemProps={menuItemProps}
            menus={menu.children}
            key={menu.menuKey}
            parentKey={menu.menuKey}
          />
        ))}
      </div>
    );
  }
}

export default LayoutSubMenu;
