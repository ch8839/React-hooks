import React from "react";
import { BrowserRouterProps } from "react-router-dom";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { Home } from "./pages/Home/index.tsx";
import * as componentsList from "./components/index.tsx";
import * as HooksList from "./pages/Hooks";
import * as toolsList from "./tools/index.ts";
import * as WebApiList from "./pages/WebApi";
import * as CssList from "./pages/Css";
import * as TipsList from "./pages/Tips";
import * as DemoList from "./pages/demo";

console.log(">>>toolsList", toolsList);
export interface IRouter {
  path: string;
  redirect?: string;
  // 表示任意类型的组件（函数组件或类组件）；仅函数组件：React.FC<Props>；仅类组件：React.ComponentClass
  // 区别于JSX.Element，表示一个已渲染的 JSX 元素
  Component?: React.ComponentType<{}>;
  /**
   * 当前路由是否全屏显示
   */
  isFullPage?: boolean;
  /**
   * meta未赋值 路由不显示到菜单中
   */
  meta?: {
    title?: string;
    Icon?: React.ReactNode;
    /**
     * 侧边栏隐藏该路由
     */
    hidden?: boolean;
    /**
     * 单层路由
     */
    single?: boolean;
  };
  children?: IRouter[];
}

function isReactFunctionComponent(Component: any): boolean {
  return typeof Component === "function";
}

function generateRouters(moduleList: any): IRouter[] {
  return Object.entries(moduleList).map(([name, module]: any) => {
    if (isReactFunctionComponent(module)) {
      return {
        path: name,
        meta: {
          title: name,
        },
        Component: module,
      };
    }

    const subModule = Object.entries(module).map(([name, item]) => {
      return {
        path: name,
        meta: {
          title: name,
        },
        Component: item as React.ComponentType<{}>,
      };
    });
    return {
      path: name,
      meta: {
        title: name,
      },
      children: subModule,
    };
  });
}

const WebApiRouters: IRouter[] = [
  {
    path: "/WebApi",
    meta: {
      title: "WebApi",
      Icon: <AppstoreOutlined />,
    },
    children: generateRouters(WebApiList),
  },
];

export const HooksRouters: IRouter[] = [
  {
    path: "/hooks",
    meta: {
      title: "hooks",
      Icon: <SettingOutlined />,
    },
    children: generateRouters(HooksList),
  },
];

export const TipsRouters: IRouter[] = [
  {
    path: "/tips",
    meta: {
      title: "tips",
      Icon: <SettingOutlined />,
    },
    children: generateRouters(TipsList),
  },
];

export const CssRouters: IRouter[] = [
  {
    path: "/CSS",
    meta: {
      title: "CSS",
      Icon: <SettingOutlined />,
    },
    children: generateRouters(CssList),
  },
];

const ComponentsRouters: IRouter[] = [
  {
    path: "/components",
    meta: {
      title: "组件",
      Icon: <AppstoreOutlined />,
    },
    children: generateRouters(componentsList),
  },
];

const ToolsChildren: IRouter[] = Object.keys(toolsList).map((name: string) => {
  const item = (toolsList as any)[name];
  return {
    path: name,
    Component: item,
    meta: {
      title: name,
    },
  };
});

export const ToolsRouters: IRouter[] = [
  {
    path: "/tools",
    meta: {
      title: "工具",
      Icon: <SettingOutlined />,
    },
    children: generateRouters(toolsList),
  },
];

export const DemoRouters: IRouter[] = [
  {
    path: "/demo",
    meta: {
      title: "demo",
      Icon: <SettingOutlined />,
    },
    children: generateRouters(DemoList),
  },
];

export const PageRouters = [
  ...ComponentsRouters,
  ...HooksRouters,
  ...ToolsRouters,
  ...WebApiRouters,
  ...TipsRouters,
  ...CssRouters,
  ...DemoRouters,
];

export const AllRouters = [
  {
    path: "/",
    loader: () => ({ message: "Hello home Router!" }),
    element: <Home></Home>,
  },
  {
    path: "/about",
    loader: () => ({ message: "Hello about Router!" }),
    Component() {
      return <h1>about</h1>;
    },
  },
  ...PageRouters,
  // {
  //   path: '/components',
  //   element: <Navigation routers={ComponentsRouters} title='components'></Navigation>,
  //   children: [...ComponentsRouters]
  // },
];
