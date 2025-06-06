import React from "react";
import Navbar from "./NavBar/NavBar";
import { Hero } from "./Hero/Hero";
import Collection from "./TrendingCollection/Collection";
import Creators from "./Creators/Creators";
import Categories from "./Categories/Categories";
import Nfts from "./TrendingNFTS/Nfts";
import Auction from "./Auction/Auction";
import How from "./HowITWorks/How";
import Subscribe from "./Subscribe/Subscribe";
import Footer from "./Footer/Footer";
const Main = () => {
  return (
    <>
      <Navbar></Navbar>
      <Hero></Hero>
      <Collection></Collection>
      <Creators></Creators>
      <Categories></Categories>
      <Nfts></Nfts>
      <Auction></Auction>
      <How></How>
      <Subscribe></Subscribe>
      <Footer></Footer>
    </>
  );
};

export default Main;
