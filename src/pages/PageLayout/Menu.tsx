import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { PageRouters, IRouter } from "../../routers";

import "./Menu.scss"

type MenuItem = Required<MenuProps>["items"][number];

const resolve = (path1 = "", path2 = "") => {
  let separator = "/";
  if (path1.endsWith("/") || path2.startsWith("/")) {
    separator = "";
  }
  return `${path1}${separator}${path2}`;
};

const items: MenuItem[] = [
  { key: "1", icon: <AppstoreOutlined />, label: "Option 1" },
  {
    key: "sub1",
    label: "Navigation One",
    icon: <MailOutlined />,
    children: [
      { key: "5", label: "Option 5" },
      { key: "6", label: "Option 6" },
    ],
  },
  {
    key: "sub2",
    label: "Navigation Two",
    icon: <AppstoreOutlined />,
    children: [
      { key: "9", label: "Option 9" },
      { key: "10", label: "Option 10" },
      {
        key: "sub3",
        label: "Submenu",
        children: [
          { key: "11", label: "Option 11" },
          { key: "12", label: "Option 12" },
        ],
      },
    ],
  },
];

const renderMenuItems = (menu: IRouter[], parentPath = ""): MenuItem[] => {
  const MenuList = menu.map((item) => {
    const { children, meta, path } = item;

    if (!meta || meta?.hidden === true) {
      // 无meta信息 或 hidden == true，路由不显示为菜单
      return null;
    }
    const { Icon, title, single } = meta;
    const routerPath = resolve(parentPath, path);
    let menuItem = {
      key: routerPath,
      label: title,
      icon: Icon,
    };
    if (children && children.length > 0) {
      return {
        ...menuItem,
        children: renderMenuItems(children, routerPath),
      };
    }
    return menuItem;
  });
  return MenuList;
};

export const MenuContainer = function () {
  const { pathname } = useLocation();
  const defaultOpenKeys = pathname
    .split("/")
    .slice(1)
    .reduce((prev: string[], cur: string, index) => {
      const curKey = index == 0 ? "/" + cur : prev[prev.length - 1] + "/" + cur;
      console.log('curKey', curKey)
      prev.push(curKey);
      return prev;
    }, []);
  const navigate = useNavigate();
  const onClick: MenuProps["onClick"] = (e) => {
    // console.log("click ", e);
    // const keyPath = e.keyPath;
    // const originPath = keyPath.reverse().join("/");
    const originPath = e.key;
    console.log("originPath", originPath);
    navigate(originPath);
  };

  const MenuList = renderMenuItems(PageRouters);

  return (
    <div className="sider-container">
      <Menu
        className="sider-menu"
        theme="dark"
        onClick={onClick}
        style={{ width: 256, height: "100%" }}
        defaultSelectedKeys={[pathname]}
        defaultOpenKeys={defaultOpenKeys}
        mode="inline"
        items={MenuList}
      />
    </div>
  );
};
