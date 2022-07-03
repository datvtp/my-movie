import React from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation } from "swiper";

import { fetcher, API_KEY } from "../../config";
import Button from "../button/Button";

const Banner = () => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`,
    fetcher
  );

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
  const { backdrop_path, title, id } = item;

  const navigate = useNavigate();

  const handleOnClickWatchNow = () => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className=" w-full h-full rounded-lg relative">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
      <img
        src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
        alt=""
        className="w-full h-full object-cover rounded-lg object-top"
      />
      <div className="absolute left-5 bottom-5 w-full text-white">
        <h2 className="font-bold text-3xl mb-5">{title}</h2>
        <div className="flex items-center gap-x-3 mb-8">
          <span className="py-2 px-4 border border-white rounded-md">
            Adventure
          </span>
          <span className="py-2 px-4 border border-white rounded-md">
            Adventure
          </span>
          <span className="py-2 px-4 border border-white rounded-md">
            Adventure
          </span>
        </div>
        <Button onClick={handleOnClickWatchNow}>Watch now</Button>
      </div>
    </div>
  );
};

export default Banner;
