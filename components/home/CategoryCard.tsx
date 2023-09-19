'use client'

import { motion } from "framer-motion"; // Framer Motion 라이브러리에서 'motion' 컴포넌트 가져오기
import { fadeIn } from "../../utils/motion"; // 사용자 정의 애니메이션 효과 함수 가져오기
import styles from "@/app/styles"; // 스타일 시트 가져오기
import { useRouter } from "next/navigation";

// 카테고리 카드의 속성(props)을 정의한 인터페이스
interface CategoryCardProps {
  id: number | string; // 카드 고유 ID (숫자 또는 문자열로 허용)
  imgUrl: string; // 이미지 URL
  title: string; // 카드 제목
  index: number; // 카드의 인덱스
  active: string; // 활성 상태 여부를 나타내는 문자열
  handleClick: (id: string) => void; // 카드 클릭 핸들러 함수 (카드 ID를 문자열로 받음)
}

// CategoryCard 컴포넌트 정의
const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  imgUrl,
  title,
  index,
  active,
  handleClick,
}) => {
  const router = useRouter();
  return (
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)} // Framer Motion을 사용한 애니메이션 효과 설정
      className={`relative ${
        active === id ? "lg:flex-[3.5] flex-[10]" : "lg:flex-[0.5] flex-[2]"
      } flex items-center justify-center min-w-[170px] h-[700px] transition-[flex] duration-[0.7s] ease-out-flex cursor-pointer`}
      onClick={() => handleClick(String(id))} // 카드 클릭 시 handleClick 함수 호출 (ID를 문자열로 변환하여 전달)
    >
      <img
        src={imgUrl}
        alt="planet-01"
        className="absolute w-full h-full object-cover rounded-[24px]" // 이미지 스타일 설정
      />
      {active !== id ? ( // 카드가 활성 상태가 아닌 경우
        <h3 className="font-semibold sm:text-[26px] text-[18px] text-white absolute z-0 lg:bottom-20 lg:rotate-[-90deg] lg:origin-[0,0]">
          {title}
        </h3>
      ) : (
        // 카드가 활성 상태인 경우
        <div className="absolute bottom-0 p-5 flex justify-start w-full flex-col bg-[#aa7cf56c] backdrop-blur-[0.5rem] rounded-b-[24px]">
          <div
            className={`${styles.flexCenter} w-[60px] h-[60px] rounded-[24px] glassmorphism mb-[16px]`}
          >
            <img
              onClick={() => router.push("/")}
              src="/headset.svg"
              alt="headset"
              className="w-1/2 h-1/2 object-contain" // 이미지 스타일 설정
            />
          </div>
          <p className="font-normal text-[16px] leading-[20.16px] text-[#EFE7F5] uppercase">
            아이콘 클릭해주세요.
          </p>
          <h2 className="mt-[20px] font-semibold sm:text-[50px] text-[24px] text-white">
            {title}
          </h2>
        </div>
      )}
    </motion.div>
  );
};

export default CategoryCard; // CategoryCard 컴포넌트를 내보내기
