import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

function SignIn() {
    // 이메일 로그인
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const signIn = (e) => {
        e.preventDefault(); // 페이지 리로드 방지
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            console.log(userCredential);
            alert(`${email} 로그인`);
        }).catch((error)=>{
            console.log(error);
        })
    }

    return (
        <div>
            <form onSubmit={signIn}>
                Email
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
                <button type='submit'>Log in</button>

            </form>
        </div>
    );
}

export default SignIn;