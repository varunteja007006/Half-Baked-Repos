import React from "react";
import { CodeBlock } from "../../main";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UseUnsplashGlobalContext } from "../../../context/UnsplashGlobalContext";

function Gallery() {
  const apiKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  const url = `https://api.unsplash.com/search/photos?client_id=${apiKey}`;

  const { searchTerm } = UseUnsplashGlobalContext();

  const result = useQuery({
    queryKey: ["images", searchTerm],
    queryFn: async () => {
      const response = await axios.get(`${url}&query=${searchTerm}`);
      return response;
    },
  });
  if (result.isLoading) {
    return (
      <>
        <div className="alert alert-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>Searching for the images.</span>
        </div>
      </>
    );
  }
  if (result.isError) {
    return (
      <>
        <div className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error! Something went wrong.</span>
        </div>
      </>
    );
  }

  const outputData = result.data.data.results;
  if (outputData.length < 1) {
    return (
      <>
        <div className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>No results found.</span>
        </div>
      </>
    );
  }
  return (
    <div>
      <>
        <div className="flex flex-wrap gap-4 py-5">
          {outputData.map((item) => {
            return (
              <img
                src={item?.urls?.regular}
                alt={item?.alt_description}
                key={item?.id}
                className=" h-40 w-50"
              />
            );
          })}
        </div>
      </>
    </div>
  );
}

export default Gallery;
