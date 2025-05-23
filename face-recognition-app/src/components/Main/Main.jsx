import React from "react";
import Navbar from "./NavBar/NavBar";
import { Hero } from "./Hero/Hero";
import Collection from "./TrendingCollection/Collection";
import Creators from "./Creators/Creators";

const Main = () => {
  return (
    <>
      <Navbar></Navbar>
      <Hero></Hero>
      <Collection></Collection>
      <Creators></Creators>
    </>
  );
};

export default Main;
