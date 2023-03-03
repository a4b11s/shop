import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./Layout";

import { routes } from "./routes/routes";

import "@fontsource/montserrat";

import { fetchProducts } from "./store/productsSlice";
import { useAppDispatch } from "./store/store";

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {routes.map(({ path, name, component: Component, isIndex }) => {
            return (
              <Route
                index={isIndex}
                key={name}
                path={path}
                element={<Component />}
              />
            );
          })}
        </Route>
      </Routes>
    </>
  );
};

export default App;
