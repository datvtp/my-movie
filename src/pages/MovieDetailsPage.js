import useSWR from "swr";
import React from "react";
import { useParams } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";

import { fetcher, tmdbAPI } from "../config";
import MovieCard from "../components/movie/MovieCard";

const MovieDetailsPage = () => {
  const { movieId } = useParams();

  const { data } = useSWR(tmdbAPI.getMovieDetails(movieId), fetcher);

  if (!data) return null;

  const { backdrop_path, poster_path, title, genres, overview } = data;

  return (
    <div className="pb-10">
      <div className="w-full h-[600px] relative">
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${tmdbAPI.getImage(
              "original",
              backdrop_path
            )})`,
          }}
        ></div>
      </div>

      <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
        <img
          src={tmdbAPI.getImage("original", poster_path)}
          alt=""
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      <h1 className="text-center text-4xl font-bold text-white mb-10">
        {title}
      </h1>

      {genres.length > 0 && (
        <div className="flex items-center justify-center gap-x-5 mb-10">
          {genres.map((item) => (
            <span
              className="py-2 px-4 border border-primary rounded-3xl text-primary"
              key={item.id}
            >
              {item.name}
            </span>
          ))}
        </div>
      )}

      <p className="text-center leading-relaxed max-w-[600px] mx-auto text-sm mb-10">
        {overview}
      </p>

      <MovieMeta type="credits" />
      <MovieMeta type="videos" />
      <MovieMeta type="similar" />
    </div>
  );
};

function MovieMeta({ type }) {
  const { movieId } = useParams();

  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, type), fetcher);

  if (!data) return null;

  if (type === "credits") {
    const { cast } = data;
    if (!cast || cast.length <= 0) return null;

    return (
      <div className="py-10">
        <h2 className="text-center text-3xl mb-10">Casts</h2>
        <div className="grid grid-cols-4 gap-10">
          {cast.slice(0, 8).map((item) => (
            <div className="cast-item" key={item.id}>
              <img
                src={tmdbAPI.getImage("original", item.profile_path)}
                alt=""
                className="w-full h-[350px] object-cover rounded-lg mb-3"
              />
              <h3 className="text-xl font-medium">{item.name}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "videos") {
    const { results } = data;
    if (!results || results.length <= 0) return null;

    const videos = results.filter(
      (item) => item.type === "Trailer" && item.official === true
    );

    return (
      <div className="py-10">
        <div className="flex flex-col gap-10">
          {videos.slice(0, 2).map((item) => (
            <div className="" key={item.id}>
              <h3 className="mb-5 text-xl font-medium p-3 bg-secondary inline-block">
                {item.name}
              </h3>
              <div className="w-full aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${item.key}`}
                  title={item.name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full object-fill"
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "similar") {
    const { results } = data;
    if (!results || results.length <= 0) return null;

    return (
      <div className="py-10">
        <h2 className="text-center text-3xl mb-10">Similar movies</h2>
        <div className="movie-list">
          <Swiper grabCursor spaceBetween={40} slidesPerView={4}>
            {results.length > 0 &&
              results.map((item) => (
                <SwiperSlide key={item.id}>
                  <MovieCard item={item} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    );
  }
}

export default MovieDetailsPage;
