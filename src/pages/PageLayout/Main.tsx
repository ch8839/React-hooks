import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { PageRouters, IRouter } from "../../routers";

import "./Main.scss";

type TRenderRoutes = (
  routes: IRouter[],
  parentPath?: string,
  breadcrumbs?: string[]
) => React.ReactNode[];

const resolve = (path1 = "", path2 = "") => {
  let separator = "/";
  if (path1.endsWith("/") || path2.startsWith("/")) {
    separator = "";
  }
  return `${path1}${separator}${path2}`;
};

const renderRoutes: TRenderRoutes = (routes, parentPath = "") => {
  return routes.map((route, index) => {
    const { Component, children, redirect, path } = route;
    const routePath = resolve(parentPath, route.path);
    if (redirect) {
      // 重定向
      return (
        <Route
          key={index}
          path={routePath}
          element={<Navigate to={redirect} replace />}
        />
      );
    }

    if (children && children.length > 0) {
      return renderRoutes(children, routePath);
    }

    return (
      <Route key={routePath} path={routePath} Component={Component}></Route>
    );
  });
};

export const Main = function () {
  const location = useLocation();
  console.log(">>>location", location);

  return (
    <div className="main">
      <Suspense fallback={<div>loading</div>}>
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="page" timeout={300}>
            <Routes>
              {renderRoutes(PageRouters)}
              {/* <Route
            path="/components/FlexBox"
            Component={lazy(() => import("../../components/flex-box"))}
          ></Route> */}
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </Suspense>
    </div>
  );
};
