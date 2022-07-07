import React from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import useSWR from "swr";
import PropTypes from "prop-types";

import { fetcher, tmdbAPI } from "../../config";

import MovieCard from "./MovieCard";

const MovieList = ({ type }) => {
  const { data } = useSWR(tmdbAPI.getMovieList(type), fetcher);

  const movies = data?.results || [];

  return (
    <div className="movie-list">
      <Swiper grabCursor spaceBetween={40} slidesPerView={4}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

MovieList.propTypes = {
  type: PropTypes.string.isRequired,
};

export default MovieList;
