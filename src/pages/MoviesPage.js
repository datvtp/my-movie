import useSWR from "swr";
import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";

import { fetcher, tmdbAPI } from "../config";
import useDebounce from "../hooks/useDebounce";
import MovieCard from "../components/movie/MovieCard";
import Loading from "../components/loading/Loading";

const itemsPerPage = 20;

const MoviesPage = () => {
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [nextPage, setNextPage] = useState(1);

  const [filter, setFilter] = useState("");
  const filterDebounce = useDebounce(filter, 500);
  const [url, setUrl] = useState(tmdbAPI.getMovieList("popular", nextPage));
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const { data, error } = useSWR(url, fetcher);

  useEffect(() => {
    if (filterDebounce) {
      setUrl(tmdbAPI.getMovieSearch(filterDebounce, nextPage));
    } else {
      setUrl(tmdbAPI.getMovieList("popular", nextPage));
    }
  }, [filterDebounce, nextPage]);

  const isLoading = !data && !error;

  const movies = data?.results || [];

  useEffect(() => {
    if (!data || !data.total_results) return;
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [data, itemOffset]);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % data.total_results;
    setItemOffset(newOffset);
    setNextPage(e.selected + 1);
  };

  return (
    <div className="py-10 page-container">
      <div className="flex items-center bg-slate-800 rounded-full mb-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 mx-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-4 bg-inherit outline-none"
            placeholder="Type here to search ..."
            onChange={handleFilterChange}
          />
        </div>
      </div>

      {isLoading && <Loading />}

      <div className="grid grid-cols-4 gap-10">
        {!isLoading &&
          movies.length > 0 &&
          movies.map((item) => <MovieCard key={item.id} item={item} />)}
      </div>

      <div className="mt-10">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="pagination"
        />
      </div>
    </div>
  );
};

export default MoviesPage;
