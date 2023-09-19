'use client';

import { motion } from 'framer-motion';
import { TypingText } from '@/components/home';

import styles from '@/app/styles';
import { fadeIn, staggerContainer } from '@/utils/motion';

const About = () => (
  <section className={`${styles.paddings} relative `}>
     <div className="bg-[#fbe2e3] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#946263]"></div>
        <div className="bg-[#dbd7fb] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#676394]"></div>
    <div className="gradient-02" />
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
    >
      <TypingText title="사이트 소개" textStyles="text-center" />

      <motion.p
        variants={fadeIn('up', 'tween', 0.2, 1)}
        className="mt-[8px] font-normal sm:text-[30px] text-[20px] text-center text-[#cd8dfe]"
      >
        <span className="font-extrabold text-[#B25FF3]">자유로운 창작활동</span>과 
        다양한 작품이 융합되는 곳, 여러분의 예술과 디자인이 세상에 인상을 남길 수 있는 
        특별한 공간입니다. 여러분의 작품은{' '}
        <span className="font-extrabold text-[#B25FF3]">자유로운 환경</span>에서 그 빛을 발하여,{' '}
        <span className="font-extrabold text-[#B25FF3]">탄생</span>
        시키고, 창조적 열정과 아이디어의 {' '}
        <span className="font-extrabold text-[#B25FF3]">흐름</span> 을 나타냅니다. 
        이 곳에서는 여러분의 예술과 디자인이 다양한 사람들에게 영감을 주며, 세상을{' '}
        <span className="font-extrabold text-[#B25FF3]">변화</span>시키는 역할을 할 것입니다. 
        이 공간에서 여러분의 작품은 더 큰 이야기와 연결되며, 예술과 디자인의 매력적인 세계를{' '} 
        <span className="font-extrabold text-[#B25FF3]">탐험</span>하여, 여러분의 창작물은 
        임팩트를 만들고, 우리의{' '}
        <span className="font-extrabold text-[#B25FF3]">예술</span>과 
        <span className="font-extrabold text-[#B25FF3]">디자인</span>이 무한한 가능성을 실현하는 곳입니다.
      </motion.p>

      <motion.img
        variants={fadeIn('up', 'tween', 0.3, 1)}
        src="/arrow-down.svg"
        alt="arrow down"
        className="w-[18px] h-[28px] object-contain mt-[28px]"
      />
    </motion.div>
  </section>
);

export default About;