import React from "react";
import ThemeToggle from "../component/unsplashComponents/main/ThemeToggle";
import SearchForm from "../component/unsplashComponents/main/SearchForm";
import Gallery from "../component/unsplashComponents/main/Gallery";
function unsplash() {
  return (
    <>
      <h1 className="text-2xl font-bold">Unsplash Project</h1>
      <ThemeToggle></ThemeToggle>
      <SearchForm></SearchForm>
      <Gallery></Gallery>
    </>
  );
}

export default unsplash;
