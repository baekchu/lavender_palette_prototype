import React, { useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

// 로그인 모듈
import SignUp from "./SignUp";
import SignInEmail from "./SignInEmail";
import SignInGoogle from "./SignInGoogle";
import SignInTwitter from "./SignInTwitter";

const SignIn = ({ onSignIn, onSignOut }) => { // onSignIn 콜백 함수를 props로 받음
    // 로그인 상태를 user에 저장
    const [user, setUser] = useState(null);
    const handleSignIn = (user) => { setUser(user); };

    // 콜백 함수로 로그인 상태 변수를 업데이트해 상위 컴포넌트로 전달
    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                onSignIn(user); // 로그인 상태를 App.js로 전달
            } else {
                onSignOut(); // 로그아웃 상태를 App.js로 전달
                setUser(null);
            }
        });
        return () => { listen(); };
    }, [onSignIn]);

    // 로그아웃 버튼 동작
    const handleSignOut = () => {
        signOut(auth).then(() => {
            alert('Sign Out Successful!');
            setUser(null); // 로그아웃 시 사용자 정보 초기화
        }).catch((error) => console.log(error));
    };

    {/**************************  출력 부분 **************************/ }
    return (
        <div>
            {user ? (
                <>  {/* 로그인 시 로그인 된 계정 출력 */}
                    {` Signed In as ${user.email}`}
                    <button onClick={handleSignOut}>Sign Out</button>
                </>
            ) : (
                <>  {/* 로그인 x 시 로그인 창 출력 */}
                    <SignInEmail />
                    <SignUp />
                    <SignInGoogle onSignIn={handleSignIn} />
                    <SignInTwitter onSignIn={handleSignIn} />
                </>
            )}
        </div>
    );
}

export default SignIn;
