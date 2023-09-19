import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

function SignUp() {
    // 이메일 로그인
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
            }).catch((error) => {
                let s = '';
                if (error.code === "auth/weak-password") {
                    s = "비밀번호가 너무 약합니다.";
                } else if (error.code === "auth/email-already-in-use") {
                    s = "이미 사용 중인 이메일 주소입니다.";
                } else if (error.code === "auth/invalid-email") {
                    s = "올바르지 않은 이메일 형식입니다.";
                } else {
                    s = "알 수 없는 에러가 발생했습니다.\n" + error;
                }
                alert(s);
            })
    }

    return (
        <div>
            <form onSubmit={signUp}>
                Create Account
                <input
                    type='email'
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type='password'
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit'>Sign Up</button>

            </form>
        </div>
    );
}

export default SignUp;