import React, { useState, useEffect } from "react";
import { auth, provider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";

const SignInGoogle = ({ onSignIn }) => {
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
            <button onClick={handleClick}>구글 로그인</button>
        </div>
    );
}

export default SignInGoogle;