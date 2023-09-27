"use client";

import { Metadata } from "next";
import ShopMain from '../../../src/components/DesignShop/ShopMain';

export const metadata: Metadata = {
  title: "LavenderPalette",
};

const Shop = () => {
  return (
    <section className="flex justify-center">
      <div className="mt-5">
        <ShopMain />
      </div>
    </section>
  );
};

export default Shop;
