import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "swiper/css/navigation";
import "swiper/scss";

import Main from "./components/layout/Main";
import Loading from "./components/loading/Loading";

const HomePage = lazy(() => import("./pages/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
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
              path="/movie"
              element={
                <>
                  <MoviesPage />
                </>
              }
            />
            <Route
              path="/movie/:movieId"
              element={
                <>
                  <MovieDetailsPage />
                </>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
