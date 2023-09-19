import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { doc, setDoc, arrayUnion } from 'firebase/firestore';
import { Margin } from '@mui/icons-material';

// 임시로 메세지를 보내는 기능을 구현해 놓음
// Messages 컬렉션 --> 수신자 문서 --> 발신자 배열 필드 --> 메세지 형태로 저장
const SendMessage = ( {user} ) => {
    const [recipient, setRecipient] = useState('');
    const [form, setForm] = useState({
        context: '',
        sendTime: new Date(),
        attached: null,
    });

    const handleChange = (event) => {
        setForm((prevForm) => ({
            ...prevForm,
            context: event.target.value,
        }))
    };

    const resetForm = () => {
        setForm({
            context: '',
            sendTime: new Date(),
            attached: null,
        });
    }

    const submitMessage = async (event) => {
        event.preventDefault();

        // 로그인 상태가 아닐때
        if (user == null) {
            console.log('Please log in!');
            return;
        }
        // 메시지가 입력되지 않았을 때
        if (form.context === "") {
            console.log('Please insert any text!');
            return;
        }
        // 받는 사람이 입력되지 않았을 때
        if (!recipient) {
            console.log('누구한테 메일을 보낼지 적어주셈!');
            return;
        }

        setForm((prevForm) => ({
            ...prevForm,
            sendTime: new Date(),
        }))

        // 수신자 문서에 메시지 저장
        const docRef = doc(db, 'Messages', recipient);
        try {
            await setDoc(docRef, {
                [user?.email]: arrayUnion(form), // 발신자 배열에 새로운 메시지 추가
            }, { merge: true }); // 다른 필드가 이미 존재한다면 보존하기 위해 merge 옵션 사용
        } catch (error) {
            console.error('메시지를 수신자에게 보내는 중 오류 발생:', error);
        }

        // 메시지 전송 후 폼 초기화
        resetForm();
        console.log('전송 완료');
    };

    return (
        <>
            <form style={{border:'1px solid black', margin:'5px'}}>
                <div>
                    <label>보내는 사람 - </label>
                    {user?.email ? <span>{user.email}</span> : <span>로그인이 필요합니다.</span>}
                </div>
                <div>
                    <label>받는 사람</label>
                    <input
                        type='text'
                        value={recipient}
                        onChange={(event) => setRecipient(event.target.value)}
                    />
                </div>
                <div>
                    <label>메시지</label>
                    <input
                        type='text'
                        value={form.context}
                        onChange={handleChange}
                    />
                </div>
                <button onClick={submitMessage}>메시지 보내기</button>
            </form>
        </>

    );
}

export default SendMessage;
