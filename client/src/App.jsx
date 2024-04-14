import { Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { appRoutes } from "./routes";
import { useCookies } from "react-cookie";
import { SwitchTransition, CSSTransition } from "react-transition-group";

function App() {
  const [cookies, _] = useCookies();
  const location = useLocation();

  return (
    <SwitchTransition component={null}>
      <CSSTransition
        classNames="fade"
        timeout={300}
        unmountOnExit
        key={location.pathname}
      >
        <Suspense fallback={() => <h1>Loading...</h1>}>
          <Routes>
            {appRoutes.map((route) => {
              if (route.requiresAuth && !cookies.token) {
                return (
                  <Route
                    key={route.path}
                    exact
                    path={route.path}
                    element={<Navigate replace to="/auth/login" />}
                  />
                );
              } else {
                return (
                  <Route
                    key={route.path}
                    exact
                    path={route.path}
                    element={<route.component />}
                  />
                );
              }
            })}
          </Routes>
        </Suspense>
      </CSSTransition>
    </SwitchTransition>
  );
}

export default App;
