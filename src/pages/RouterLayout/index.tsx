
import { Routes, Route, Navigate } from "react-router-dom";
import { IRouter, LayoutRouters } from "./routes"
import styles from "./index.module.less";

export const RouterLayout = function () {
  return (
    <div className={styles.RouterLayout}>
      <Routes>
        {LayoutRouters.map(({ path, Component, children }) => {
          return (
            <Route
              key={path}
              path={path}
              element={
                <ChildComp Comp={Component} routes={children}></ChildComp>
              }
            ></Route>
          );
        })}
      </Routes>
    </div>
  );
};

const ChildComp = ({
  Comp,
  routes,
}: {
  Comp: IRouter["Component"];
  routes: IRouter["children"];
}) => {
  return Comp ? (
    <Comp>
      <Routes>
        {routes?.map(({ path, redirect, Component, children }) => {
          if (redirect) {
            return (
              <Route
                key={path}
                path={path}
                element={<Navigate to={redirect} replace />}
              />
            );
          }
          return (
            <Route
              key={path}
              path={path}
              element={
                <ChildComp Comp={Component} routes={children}></ChildComp>
              }
            ></Route>
          );
        })}
      </Routes>
    </Comp>
  ) : null;
};
