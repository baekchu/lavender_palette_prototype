"use client";


import ArtworkRegist from "@/components/ArtworkRegist/ArtworkRegist";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LavenderPalette",
};

const Quest = () => {
  return (
    <section className="flex justify-center">
      <div className="mt-5">
        <ArtworkRegist registType={1}/>
      </div>
    </section>
  );
};

export default Quest;
