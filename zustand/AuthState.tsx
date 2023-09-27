import { create } from 'zustand';
import { auth, db } from "@/Firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

// **** [[  F U N C T I O N  ]] ***********************************************
// 1) 로그인 성공 시 계정의 uid를 auth.currentUser.uid로부터 받아옴
// 2) uid를 이용하여 서버에 저장된 정보 불러와 zustand의 user에 저장
// 3) isLoggined : 로그인 상태, user : 로그인 유저 정보
// 4) login(유저 uid), logout(void), refresh(유저 uid)  => 로그인 상태, 정보 관리

interface UserDataProps {
    // 필수 데이터는 별표(*)로 표시
    // [[ 고정 데이터]]
    uid: string,            // 계정 uid*
    email: string,          // 이메일*
    birth: string,            // 생일*

    // [[ 직접 수정 불가 데이터 ]] ----------------- 별도의 계산 함수 필요
    likes: number,          // 누적 좋아요
    artworks: string[],     // 등록한 작품의 링크
    messageRooms: string[],  // 참가한 채팅방
    followers: string[],    // 이 유저를 팔로우 하는 사람들
    following: string[],    // 유저가 팔로우 하는 사람들

    // [[ 직접 수정 가능 데이터 ]]
    nickname: string,       // 닉네임*
    profImg: string,        // 프로필 사진
    introduction: string,   // 자기소개
    interestTags: string[], // 관심 태그*
    contactInfo: string,    // 비즈니스 연락처
    externalLink: string,   // 외부 웹사이트 링크

    // 인덱스 시그니처
    [key: string]: string | string[] | number | Date;
}

interface AuthStore {
    isLoggedIn: boolean;
    user: UserDataProps | null;
    login: (userID: string) => void;
    logout: () => void;
    refresh: (userID: string) => void;
}

const initialAuthState = {
    isLoggedIn: false,
    user: null,
};

// 로그인 시 유저 데이터를 불러오는 함수, 유저 데이터가 없을 시 데이터 입력창을 띄움
const fetchUserData = async (userID: string) => {
    if (!userID) return;

    try {
        const userDataRef = doc(db, "UserData", userID);
        const userDataSnapshot = await getDoc(userDataRef);

        if (userDataSnapshot.exists()) {
            const tempUserData = userDataSnapshot.data() as UserDataProps;
            return tempUserData;
        } else {
            console.log("사용자 데이터가 없음");
            // 사용자 정보 입력 창으로 즉시 이동 필요!
            return;
        }
    } catch (error) {
        console.error("사용자 데이터 가져오기 오류:", error);
        return;
    }
};


// ----------------- <<< 호출에 대한 동작 부분 >>> ----------------------------------------
const authState = create<AuthStore>((set) => ({
    ...initialAuthState,
    // A) 로그인 인증에 성공하면 UID를 이용하여 서버에 저장된 계정 정보를 불러옴 **************
    login: async ( userID ) => {
        console.log('Logging in:', userID);
        const savedUserData = await fetchUserData(userID);
        if (savedUserData) {
            set({ isLoggedIn: true, user: savedUserData });
        } else {
            console.log("사용자 정보 입력 창으로 이동");
        }
    },

    // B) 로그아웃 시 로그인 상태를 false로 만들고 현재 user 정보와 로컬스토리지를 초기화 *****
    logout: () => {
        console.log('Logging out');
        set(initialAuthState);
        localStorage.removeItem('authState');
        // Refresh the site after logout
        window.location.reload();
    },

    // C) 계정 정보 새로 불러오기             !! 중요 !!
    // *******************   유저 정보 수정 시 필수적으로 호출해야함!! **********************
    refresh: async ( userID ) => {
        const savedUserData = await fetchUserData(userID);
        if (savedUserData) {
            set({ user: savedUserData });
        } else {
            console.log("사용자 정보 입력 창으로 이동");
        }
    },
}));

const savedState: string | null = localStorage.getItem('authState');
if (savedState) {
    authState.setState(JSON.parse(savedState));
}

authState.subscribe((state) => {
    localStorage.setItem('authState', JSON.stringify(state));
});

export default authState;
