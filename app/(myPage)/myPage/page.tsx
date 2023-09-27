"use client";

import { Metadata } from "next";
import UserPage from '../../../src/components/UserPage/UserPageMain';

export const metadata: Metadata = {
  title: "LavenderPalette",
};

const MyPage = () => {
  return (
    <section className="flex justify-center">
      <div className="mt-5">
        <UserPage />
      </div>
    </section>
  );
};

export default MyPage;
