declare module 'next-navigation' {
  import { NextRouter } from 'next/router';

  // next-navigation 모듈의 사용할 수 있는 멤버를 여기에 추가합니다.
  export const useRouter: () => NextRouter;
  // 다른 멤버들도 필요한 경우 추가하세요.
}