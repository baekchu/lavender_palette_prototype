// 0923 백업
import React, { useState, useMemo, useEffect } from "react"
import { db, auth } from '@/Firebase/firebaseConfig';
import { collection, doc, setDoc, getDoc, onSnapshot, query, orderBy, QuerySnapshot } from 'firebase/firestore';
import { SHA256 } from 'crypto-js';

import authState from "@/zustand/AuthState";

// 메세지에 담기는 내용
interface MessageProps {
    text: string,
    time: number,
    sender: string,
    attached: null | string,
}

const ChatModule = () => {

    // A ) 임시 송신자 셋팅 ***********************************************
    /*
    const { isLoggedIn, user, login, logout } = authState();
    const cachedUser = useMemo(() => user, [user]);
    const tempEmail = 'test0826@gmail.com';
    const tempImg = 'https://i.pinimg.com/1200x/9d/a1/e1/9da1e149417b0a724222012b57197341.jpg';
    const tempNick = '애옹';
    const uid = auth.currentUser?.uid;

    useEffect(() => {
        if (user) return;
        login({ email: tempEmail, image: tempImg, nickname: tempNick });
        console.log(uid);
    }, []);
    console.log(user);

    useEffect(()=>{
        if(!uid) console.log(auth.currentUser?.uid);
    },[uid]);
    */
    const [uid, setUid] = useState<string>("");


    // B ) 임시 수신자 셋팅 **********************************************************
    const [getter, setGetter] = useState<string>("");


    // C ) 채팅방 ID 얻는 해시 함수 **************************************************
    const [roomID, setRoomID] = useState<string>("");
    const getRoomID = (id1: string, id2: string): string => {
        const sortCombineStr = [id1, id2].sort().join('-');
        const hash = SHA256(sortCombineStr).toString();
        return (hash);
    }

    useEffect(() => {
        if (!uid) return;
        setRoomID(getRoomID(uid, getter));
    }, [uid, getter]);


    // D) 추가할 메세지를 입력받아 형식에 맞게끔 설정 **********************************
    const [newMes, setNewMes] = useState<MessageProps | null>({
        text: "", time: 0, sender: "", attached: null
    });
    const handleNewMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!uid) return;
        const { value } = e.target;

        // 사용자가 입력한 메시지를 MessageProps 형식에 맞게 설정
        // time은 밀리초 단위로 저장됨. 출력 시 변환 필요
        setNewMes({
            text: value,
            time: new Date().getTime(),
            sender: uid,
            attached: null,
        });
    };
    // 밀리초를 '월.일 시:분'으로 형변환
    const changeDateType = (millisec: number): string => {
        const date = new Date(Number(millisec));

        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${month}.${day} ${hours}:${minutes}`;
    };


    // E) 선택된 채팅방에 메세지 추가하기 ********************************************
    const AddMes = async () => {
        if (!newMes || !newMes.text.trim()) return; // 메세지가 공백일 때 서버 저장 X

        const messageRef = collection(db, "Messages", roomID, "Message");
        const newMessageRef = doc(messageRef);
        await setDoc(newMessageRef, newMes);

        setNewMes({ text: "", time: 0, sender: "", attached: null });
    };


    // F) 채팅방 데이터 실시간 업데이트 ************************************************
    // 추가 필요 - 하나 이상의 메세지가 오갔으면 대화 참여자 정보에 채팅방 id를 저장함m
    const [roomData, setRoomData] = useState<MessageProps[] | null>(null);
    useEffect(() => {
        if (!roomID) return;

        const messageRef = collection(db, "Messages", roomID, "Message");
        const q = query(messageRef, orderBy("time"));

        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            const updatedDate: MessageProps[] = []; // MessageProps 타입의 배열로 명시적으로 타입 지정
            QuerySnapshot.forEach((doc) => {
                updatedDate.push(doc.data() as MessageProps); // doc.data()의 타입을 MessageProps로 캐스팅
            });
            setRoomData(updatedDate);
        })

        return () => {
            unsubscribe();
        };
    }, [roomID]);



    // 리턴 부분 **********************************************************************
    return (
        <>
            <div>
                {/** 임시 uid 입력부분 */}
                <div>
                    보낸사람
                    <input type="text" onChange={(e) => { setUid(e.target.value) }} />
                </div>
                <div>
                    받는사람
                    <input type="text" onChange={(e) => { setGetter(e.target.value) }} />
                </div>
            </div>

            {/** 채팅방 진입 */}
            <form onSubmit={(e) => {
                e.preventDefault();
                //connectRoom();
            }}>
                {roomID ? roomID : "EMPTY"}
                <button>채팅방 접속</button>
            </form>
            <hr />

            {/** 메세지 입력 */}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    AddMes();
                }}>
                <input
                    type="text"
                    name="message"
                    value={newMes?.text || ""}
                    onChange={handleNewMessageChange}
                    placeholder="메시지 입력"
                />
                <button>메시지 전송</button>
            </form>
            <hr />

            {/** 채팅창 출력 */}
            <div className="border border-black border-medium">
                {roomData && roomData.map((message, index) => (
                    <span key={index}>
                        {message.sender} 님 :  {message.text} - {changeDateType(message.time)} <br />
                    </span>
                ))}
            </div>
        </>
    )
}

export default ChatModule;