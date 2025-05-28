import React from "react";
import Navbar from "./NavBar/NavBar";
import { Hero } from "./Hero/Hero";
import Collection from "./TrendingCollection/Collection";
import Creators from "./Creators/Creators";
import Categories from "./Categories/Categories";
import Nfts from "./TrendingNFTS/Nfts";
const Main = () => {
  return (
    <>
      <Navbar></Navbar>
      <Hero></Hero>
      <Collection></Collection>
      <Creators></Creators>
      <Categories></Categories>
      <Nfts></Nfts>
    </>
  );
};

export default Main;
