import { create } from 'zustand';

interface User {
    email: string | null;
    image: string | null;
    nickname: string | null;
    uid: string | null;
}

interface AuthStore {
    isLoggedIn: boolean;
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    reset: () => void;
}

// 초기 로그인 상태, 임시로 변경했음
const initialAuthState = {
    isLoggedIn: false,
    user: {
        email: null,
        image: null,
        nickname: null,
        uid: null,
    },
};

const authState = create<AuthStore>((set) => ({
    ...initialAuthState,
    login: (userData) => {
        console.log('Logging in:', userData);
        set({ isLoggedIn: true, user: userData });
    },
    logout: () => {
        console.log('Logging out');
        set(initialAuthState);
        localStorage.removeItem('authState');
        // Refresh the site after logout
        window.location.reload();
    },
    reset: () => {
        set(initialAuthState);
    },
}));

/*
const savedState = localStorage.getItem('authState');
if (savedState) {
    authState.setState(JSON.parse(savedState));
}

authState.subscribe((state) => {
    localStorage.setItem('authState', JSON.stringify(state));
});*/

export default authState;
