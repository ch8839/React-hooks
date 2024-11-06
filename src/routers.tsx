import { BrowserRouterProps } from "react-router-dom";
import { Home } from "./pages/Home/index.tsx";
import * as componentsList from "./components/index.tsx";
import * as HooksList from "./pages/Hooks";
import * as toolsList from "./tools/index.ts";
import * as WebApiList from "./pages/WebApi";
import * as TipsList from "./pages/Tips";

import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";

export interface IRouter {
  path: string;
  redirect?: string;
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

function generateRouters(moduleList: any): IRouter[] {
  return Object.entries(moduleList).map(([name, module]: any) => {
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

const ComponentsChildren: IRouter[] = Object.keys(componentsList).map(
  (name: string) => {
    const item = (componentsList as any)[name];
    return {
      path: name,
      Component: item,
      meta: {
        title: name,
      },
    };
  }
);

const ComponentsRouters: IRouter[] = [
  {
    path: "/components",
    meta: {
      title: "组件",
      Icon: <AppstoreOutlined />,
    },
    children: ComponentsChildren,
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
    children: ToolsChildren,
  },
];

export const PageRouters = [
  ...ComponentsRouters,
  ...HooksRouters,
  ...ToolsRouters,
  ...WebApiRouters,
  ...TipsRouters,
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
