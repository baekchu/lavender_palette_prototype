"use client";

import { motion } from "framer-motion";

import { fadeIn } from "@/utils/motion";
interface PopularWorksProps {
  index: number; // 카드의 인덱스
  imgUrl: string; // 이미지 URL
}

const PopularWorks: React.FC<PopularWorksProps> = ({ index,imgUrl }) => {
  return (
    <motion.div
      variants={fadeIn("down", "spring", index * 0.5, 1)}
      className="flex md:flex-row flex-col gap-4"
    >
      <img
      src={imgUrl}
      alt="planet-03"
      className="w-full h-[250px] rounded-[32px] object-cover"
    />
      
    </motion.div>
  );
};

export default PopularWorks;
