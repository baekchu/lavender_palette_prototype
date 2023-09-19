"use client";

import { motion } from "framer-motion";

import { fadeIn } from "@/utils/motion";
interface PopularAuthorProps {
  index: number; // 카드의 인덱스
  imgUrl: string; // 이미지 URL
}

const PopularAuthor: React.FC<PopularAuthorProps> = ({ index,imgUrl }) => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.5, 1)}
      className="flex md:flex-row flex-col gap-4"
    >
      <img
      src={imgUrl}
      alt="planet-01"
      className="w-full h-[250px] rounded-[32px] object-cover"
    />
    </motion.div>
  );
};

export default PopularAuthor;
