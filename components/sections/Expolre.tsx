'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';


import styles from '@/app/styles'; // 스타일 시트 가져오기
import { exploreWorlds } from '@/constants'; // 탐험할 세계 목록 가져오기
import { staggerContainer } from '@/utils/motion'; // Framer Motion 애니메이션 설정 가져오기
import { CategoryCard, TitleText, TypingText } from '@/components/home'; // 사용할 컴포넌트 가져오기

const Explore = () => {
  // 'active'라는 상태 변수 초기화
  const [active, setActive] = useState('world-1');

  return (
    // 섹션 엘리먼트 설정 및 스타일 적용
    <section className={`${styles.paddings}`} id="explore">
      {/* Framer Motion 애니메이션 컨테이너 */}
      <motion.div
        variants={staggerContainer} // 애니메이션 변형 설정
        initial="hidden" // 초기 상태
        whileInView="show" // 화면에 보이는 동안 애니메이션 효과
        viewport={{ once: false, amount: 0.25 }} // 뷰포트 설정
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        {/* 타이핑 효과를 가진 텍스트 컴포넌트 */}
        <TypingText title="|카테고리|" textStyles="text-center" />
        
        {/* 페이지 제목 텍스트 */}
        <TitleText
          title={<>각자의 색깔이 모여 <br className="md:block hidden" /> 더 아름다운 그림을 완성합니다.</>} // 다중 라인 텍스트
          textStyles="text-center" // 텍스트 스타일
        />
        
        {/* 세계 카테고리 카드를 담는 컨테이너 */}
        <div className=" flex lg:flex-row flex-col min-h-[700px] gap-5">
          {/* 'exploreWorlds' 배열의 각 항목에 대한 카테고리 카드를 렌더링 */}
          {exploreWorlds.map((world, index) => (
            <CategoryCard
              key={world.id} // 고유 키
              {...world} // 'CategoryCard' 컴포넌트에 전달되는 속성들
              index={index} // 인덱스
              active={active} // 활성화된 카테고리
              handleClick={setActive} // 클릭 핸들러 함수
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Explore;
