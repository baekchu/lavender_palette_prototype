import { motion } from "framer-motion"; // Framer Motion의 motion 컴포넌트 가져오기
import { textContainer, textVariant2 } from "../../utils/motion"; // 사용자 정의 애니메이션 변형 가져오기
import { ReactNode } from "react"; // ReactNode 타입 가져오기

// TypingText 컴포넌트의 속성(props) 정의
interface TypingTextProps {
  title: ReactNode; // ReactNode 타입을 사용하여 다양한 종류의 자식 요소(문자열, 엘리먼트 등)를 받을 수 있도록 함
  textStyles?: string; // 텍스트 스타일 클래스 이름
}

// TypingText 컴포넌트 정의
export const TypingText: React.FC<TypingTextProps> = ({
  title,
  textStyles,
}) => (
  <motion.p
    variants={textContainer} // 애니메이션 변형 설정을 적용
    initial="hidden" // 초기 상태 설정
    whileInView="show" // 화면에 보이는 동안 'show' 애니메이션을 적용
    className={`font-semibold text-[15px] text-[#B25FF3] ${textStyles}`} // CSS 클래스를 적용하여 스타일 설정
  >
    {/* 문자열을 문자 단위로 나누어 각 문자에 애니메이션 효과 적용 */}

    {Array.from(String(title)).map((letter, index) => (
      <motion.span variants={textVariant2} key={index}>
        {letter === " " ? "\u00A0" : letter} {/* 공백 문자 처리 */}
      </motion.span>
    ))}
  </motion.p>
);

// TitleText 컴포넌트의 속성(props) 정의
interface TitleTextProps {
  title: ReactNode; // ReactNode 타입을 사용하여 다양한 종류의 자식 요소(문자열, 엘리먼트 등)를 받을 수 있도록 함
  textStyles?: string; // 텍스트 스타일 클래스 이름
}

// TitleText 컴포넌트 정의
export const TitleText: React.FC<TitleTextProps> = ({ title, textStyles }) => (
  <motion.h2
    variants={textVariant2} // 애니메이션 변형 설정을 적용
    initial="hidden" // 초기 상태 설정
    whileInView="show" // 화면에 보이는 동안 'show' 애니메이션을 적용
    className={`mt-[10px] font-semibold md:text-[40px] text-[30px] mb-[10px] text-[#cd8dfe] ${textStyles}`} // CSS 클래스를 적용하여 스타일 설정
  >
    {title}
  </motion.h2>
);
