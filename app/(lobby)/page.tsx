"use client";

import Slider from "@/components/home/Slider";
import About from "@/components/sections/About";
import Explore from "@/components/sections/Expolre";
import Popularity from "@/components/sections/Popularity";
import Quest from "@/components/sections/Quest";
import Request from "@/components/sections/Request";
import React from "react";

const Home = () => {
  return (
    <section className="flex-start flex-col mb-16">
      <div className="bg-gradient-to-tr from-white via-transparent to-purple-300">
        <Slider />
        <About />
        <Explore />
        <Popularity />
        <Quest/>
        <Request/>
      </div>
    </section>
  );
};

export default Home;
