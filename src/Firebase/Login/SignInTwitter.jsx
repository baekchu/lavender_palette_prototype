import React, { useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
import { getAuth, TwitterAuthProvider, signInWithPopup } from "firebase/auth";

// 현재 트위터 개발자 앱에서 API를 등록하지 않아 사용이 불가합니다.

const provider = new TwitterAuthProvider();

const SignInTwitter = ({ onSignIn }) => {
    const [value, setValue] = useState('');

    const handleClick = () => {
        signInWithPopup(auth, provider).then((data) => {
            setValue(data.user.email);
            onSignIn(data.user);
        }).catch((error)=>{
            console.log(error);
        });
    }
    return (
        <div>
            <button onClick={handleClick}>트위터 로그인</button>
        </div>
    );
}

export default SignInTwitter;