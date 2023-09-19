import create from 'zustand';

interface User {
    email: string | null;
    image: string | null;
    nickname: string | null;
}

interface AuthStore {
    isLoggedIn: boolean;
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    reset: () => void;
}

const initialAuthState = {
    isLoggedIn: false,
    user: null,
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

const savedState = localStorage.getItem('authState');
if (savedState) {
    authState.setState(JSON.parse(savedState));
}

authState.subscribe((state) => {
    localStorage.setItem('authState', JSON.stringify(state));
});

export default authState;
