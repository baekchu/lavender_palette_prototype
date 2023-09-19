import { Variants } from 'framer-motion'; // Variants 타입을 framer-motion에서 가져오기

// 'staggerContainer' 애니메이션 변형 정의
export const staggerContainer: Variants = {
  hidden: {}, // 숨김 상태는 빈 객체
  show: {
    transition: {
      staggerChildren: 0.25 , // 자식 엘리먼트들 사이의 시간 간격
      delayChildren: 0.25, // 자식 엘리먼트들의 딜레이 시간
    },
  },
};

// 'textContainer' 애니메이션 변형 정의
export const textContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  show: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: i * 0.1 },
  }),
};

// 'textVariant2' 애니메이션 변형 정의
export const textVariant2: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'tween',
      ease: 'easeIn',
    },
  },
};

// 'fadeIn' 함수 정의
export const fadeIn = (
  direction: 'left' | 'right' | 'up' | 'down', // 나타날 방향 설정
  type: string, // 애니메이션 타입
  delay: number, // 딜레이 설정
  duration: number // 애니메이션 지속 시간 설정
) => ({
  hidden: {
    x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0, // 나타날 때 x 위치 설정
    y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0, // 나타날 때 y 위치 설정
    opacity: 0, // 숨김 상태에서 투명도는 0
  },
  show: {
    x: 0, // 나타날 때 x 위치는 0
    y: 0, // 나타날 때 y 위치는 0
    opacity: 1, // 나타날 때 투명도는 1
    transition: {
      type, // 지정된 애니메이션 타입 사용
      delay, // 딜레이 설정
      duration, // 애니메이션 지속 시간 설정
      ease: 'easeOut', // easeOut 이징 사용
    },
  },
});

export const zoomIn = (delay:number, duration:number) => ({
  hidden: {
    scale: 0,
    opacity: 0,
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'tween',
      delay,
      duration,
      ease: 'easeOut',
    },
  },
});