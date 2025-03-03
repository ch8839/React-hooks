import { Routes, Route, Navigate } from "react-router-dom";
import { IRouter, LayoutRouters } from "./routes";
import styles from "./index.module.less";

type TRenderRoutes = (
  routes: IRouter[],
  parentPath?: string,
  breadcrumbs?: string[]
) => React.ReactNode[];

const resolve = (path1 = "", path2 = "") => {
  let separator = "/";
  if (path2 === "/") return path1;
  if (path1.endsWith("/") || path2.startsWith("/")) {
    separator = "";
  }
  return `${path1}${separator}${path2}`;
};

const renderRoutes: TRenderRoutes = (routes, parentPath = "") => {
  return routes.map((route, index) => {
    const { Component: Comp, children, redirect, path } = route;
    const routePath = resolve(parentPath, path);
    console.log(">>>routePath", routePath);
    if (redirect) {
      // 重定向
      const redirectPath = resolve("/react-router-v2" + parentPath, redirect);
      return (
        <Route
          key={routePath}
          path={routePath}
          element={<Navigate to={redirectPath} replace />}
        />
      );
    }

    if (children && children.length > 0) {
      return (
        <Route
          key={routePath}
          path={routePath}
          element={Comp ? <Comp></Comp> : null}
        >
          {renderRoutes(children, routePath)}
        </Route>
      );
    }

    return (
      <Route
        key={routePath}
        path={routePath}
        element={Comp ? <Comp></Comp> : null}
      ></Route>
    );
  });
};

export const RouterLayoutV2 = function () {
  return (
    <div className={styles.RouterLayout}>
      <Routes>{renderRoutes(LayoutRouters)}</Routes>
    </div>
  );
};
