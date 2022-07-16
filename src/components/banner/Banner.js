import useSWR from "swr";
import React from "react";
import { Navigation } from "swiper";
import { useNavigate } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";

import Button from "../button/Button";
import { fetcher, tmdbAPI } from "../../config";

const Banner = () => {
  const { data } = useSWR(tmdbAPI.getMovieList("upcoming"), fetcher);

  const movies = data?.results || [];

  return (
    <section className="banner h-[500px] page-container mb-20">
      <Swiper
        grabCursor
        slidesPerView={"auto"}
        navigation
        modules={[Navigation]}
      >
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item} />
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

const BannerItem = ({ item }) => {
  const { id, backdrop_path, title } = item;

  const { data } = useSWR(tmdbAPI.getMovieDetails(id), fetcher);

  const navigate = useNavigate();

  if (!data) return null;

  const { genres } = data;

  const handleOnClickWatchNow = () => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className=" w-full h-full rounded-lg relative">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
      <img
        src={tmdbAPI.getImage("original", backdrop_path)}
        alt=""
        className="w-full h-full object-cover rounded-lg object-top"
      />
      <div className="absolute left-5 bottom-5 w-full text-white">
        <h2 className="font-bold text-3xl mb-5">{title}</h2>
        {genres && genres.length > 0 && (
          <div className="flex items-center gap-x-3 mb-8">
            {genres.map((item) => (
              <span
                className="py-2 px-4 border border-white rounded-md"
                key={item.id}
              >
                {item.name}
              </span>
            ))}
          </div>
        )}
        <Button onClick={handleOnClickWatchNow}>Watch now</Button>
      </div>
    </div>
  );
};

export default Banner;
