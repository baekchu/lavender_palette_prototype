import React from "react";
import { motion } from "framer-motion";
import styles from "@/app/styles";
import { insights } from "@/constants";
import { fadeIn, staggerContainer, zoomIn } from "@/utils/motion";
import { PopularWorks, PopularAuthor } from "@/components/home";
import { BsFire, BsPersonHeart } from "react-icons/bs";

const Popularity = () => {
  return (
    <section className={`${styles.paddings}`}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show" // 'whileInView' 대신 'animate' 사용
        className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-6`}
      >
        <motion.div
          variants={zoomIn(0.4, 1)}
          className="flex mx-auto justify-center items-center"
        >
          <img
            src="/search.svg"
            alt="quest"
            className="w-[400px] h-[200px] object-contain xm:h-[400px] xm:w-[600px]"
          />
        </motion.div>
      </motion.div>
      <div
        className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-10`}
      >
        <div className="flex-[0.5] lg:max-w-[600px] flex justify-end flex-col bg-[#efe7f553] backdrop-blur-[10rem] sm:p-8 p-4 rounded-[12px] border-[1px] border-[#B25FF3] relative">
          <div className="flex items-center font-semibold text-lg justify-center gap-1">
            <div className="text-purple-600">
              <BsFire />
            </div>
            인기 작품
          </div>
          <div className="feedback-gradient" />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            className={`${styles.innerWidth} mx-auto flex flex-col`}
          >
            <div className="mt-[50px] flex flex-col gap-[30px]">
              {insights.map((item, index) => (
                <PopularAuthor
                  key={`insight-${index}`}
                  {...item}
                  index={index + 1}
                />
              ))}
            </div>
          </motion.div>
        </div>
        <motion.div
          variants={fadeIn("left", "tween", 0.2, 1)}
          className="flex-[0.5] flex justify-end lg:max-w-[600px] flex-col bg-[#efe7f553] backdrop-blur-[10rem] sm:p-8 p-4 rounded-[12px] border-[1px] border-[#B25FF3] relative"
        >
          <div className="flex items-center font-semibold text-lg justify-center gap-1">
            <div className="text-purple-600 ">
              <BsPersonHeart />
            </div>
            인기 작가
          </div>
          <div className="feedback-gradient_2" />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            className={`${styles.innerWidth} mx-auto flex flex-col`}
          >
            <div className="mt-[50px] flex flex-col gap-[30px]">
              {insights.map((item, index) => (
                <PopularWorks
                  key={`insight-${index}`}
                  {...item}
                  index={insights.length - index} // 역순으로 인덱스를 조절
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Popularity;
