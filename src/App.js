import React from "react";
import { Route, Routes } from "react-router-dom";
import "swiper/css/navigation";
import "swiper/scss";

import Main from "./components/layout/Main";
import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviesPage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Main />}>
          <Route
            path="/"
            element={
              <>
                <HomePage />
              </>
            }
          />
          <Route
            path="/movies"
            element={
              <>
                <MoviesPage />
              </>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
