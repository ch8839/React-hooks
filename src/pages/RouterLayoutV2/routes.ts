import { FC, PropsWithChildren } from "react";
import { BasicLayout } from "./BasicLayout";
import { MainLayout } from "./MainLayout";
import { TopicLayout } from "./TopicLayout"
import { App1, App2 } from "./App";

export interface IRouter {
  path: string;
  redirect?: string;
  Component?: FC<PropsWithChildren>;
  children?: IRouter[];
}

export const LayoutRouters: IRouter[] = [
  {
    path: "/",
    Component: BasicLayout,
    children: [
      {
        path: "/",
        Component: MainLayout,
        children: [
          {
            path: "/",
            redirect: "/main/app1",
          },
          {
            path: "/main/app1",
            Component: App1,
          },
          {
            path: "/main/app2",
            Component: App2,
          },
        ],
      },
      {
        path: "/topic",
        Component: TopicLayout,
        // children: [
        //   {
        //     path: "/",
        //     redirect: "/react-router/app1",
        //   },
        //   {
        //     path: "/app1",
        //     Component: App1,
        //   },
        //   {
        //     path: "/app2",
        //     Component: App2,
        //   },
        // ],
      },
    ],
  },
];