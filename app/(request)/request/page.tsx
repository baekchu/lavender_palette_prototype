"use client";

import { Metadata } from "next";
import RequestMain from '../../../src/components/Request/ReqMain'

export const metadata: Metadata = {
  title: "LavenderPalette",
};

const Request = () => {
  return (
    <section className="flex justify-center">
      <div className="mt-5">
        <RequestMain />
      </div>
    </section>
  );
};

export default Request;
