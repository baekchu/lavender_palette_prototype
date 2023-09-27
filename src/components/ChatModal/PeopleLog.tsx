import React, { useState } from 'react';
import ChatUser from './ChatUser.jsx';
import SearchIcon from '@mui/icons-material/Search';
import { db } from '../../../Firebase/firebaseConfig.js';
import { collection, query, where, getDocs } from 'firebase/firestore';

interface User {

}

interface RoomInfo {
    roomID: string,
    senderNick: string,
}

interface PeopleLogProps {
    recentRoom: RoomInfo | null;
    setRecentRoom: React.Dispatch<React.SetStateAction<RoomInfo | null>>,
}

const PeopleLog: React.FC<PeopleLogProps> = ({ recentRoom, setRecentRoom }) => {
    const [userName, setUserName] = useState('');
    const [user, setUser] = useState<User | null>(null);
    const [err, setErr] = useState(false);

    const handleSearch = async () => {
        const q = query(collection(db, 'users'), where("displayName", "==", userName));
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                if (doc.data() !== null) {
                    setUser(doc.data());
                }
            })
        } catch (err) {
            setErr(true);
        }
    }

    const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.code === "Enter" && handleSearch();
    }


    // 현재 속해있는 모든 채팅방에 대한 배열을 서버에서 가져오기
    /** 해당 배열은 다음과 같은 정보를 저장하고 있어야 함
     * 
     * a) 유저의 닉네임     b) 유저의 uid        c) 이미지 경로
     * d) 마지막 채팅 내용  e) 마지막 채팅 시간   f) 새로운 채팅 여부 
     * 
    */
    const exampleChatRooms: ChatRoom[] = [
        {
            otherName: 'User1',
            otherID: '33sd22sd1xc5s',
            otherImg: 'https://cdn.class101.net/images/98905fa0-edcc-4d5c-a693-ca448a17d7ed',
            lastChat: 'Hello, how are you? Hello, how are you?',
        },
        {
            otherName: 'User2',
            otherID: 'DDs61cD5sD21X',
            otherImg: null,
            lastChat: 'Hi there!',
        },
        {
            otherName: 'User3',
            otherID: '4WWE5S12XD4',
            otherImg: null,
            lastChat: 'What are you up to?',
        },
    ];

    return (
        <div className='PeopleLog'>
            <div className="searchForm">
                <SearchIcon sx={{ fontSize: '16px', color: 'white' }} />
                <input
                    className='search'
                    type='text'
                    placeholder=' Find a user...'
                    onKeyDown={handleKey}
                    onChange={e => { setUserName(e.target.value) }} />
            </div>
            <div className='chattingRoom'>
                <ChatRoomContent
                    chatRooms={exampleChatRooms}
                    recentRoom={recentRoom}
                    setRecentRoom={setRecentRoom} />
            </div>
        </div>
    );
}


// 채팅룸 컨텍스트 인터페이스
interface ChatRoom {
    otherName: string,
    otherID: string,
    otherImg: string | null,
    lastChat: string,
}

interface ChatRoomContentProps {
    chatRooms: ChatRoom[] | null;
    recentRoom: RoomInfo | null;
    setRecentRoom: React.Dispatch<React.SetStateAction<RoomInfo | null>>,
}

/** 채팅룸 컨텍스트 */
const ChatRoomContent: React.FC<ChatRoomContentProps> = ({
    recentRoom, chatRooms, setRecentRoom
}) => {
    // 현재 선택된 채팅방 제어
    const handleRoomChange = (roomID: string) => {
        if (roomID === recentRoom?.roomID) {
            setRecentRoom(null);
        }
        else {
            const selectedChatRoom = chatRooms?.find(chatRoom => chatRoom.otherID === roomID);
            const tempInfo: RoomInfo = {
                roomID: roomID,
                senderNick: selectedChatRoom?.otherName ?? "",
            };
            setRecentRoom(tempInfo);
        }
    }

    // 개별 채팅방 출력
    return (
        chatRooms?.map((chatRoom, index) => {
            return (
                <div
                    className="userChat"
                    key={index}
                    onClick={() => handleRoomChange(chatRoom.otherID)}>
                    <img className='userImg'
                        src={chatRoom.otherImg ?? ("https://cdn-icons-png.flaticon.com/512/6596/6596121.png")}
                        alt={""} />
                    <div className="userChatInfo">
                        <span className='userName'>{chatRoom.otherName}</span>
                        <div className='userMessage'>{chatRoom.lastChat}</div>
                    </div>
                </div>
            );
        })
    );
}

export default PeopleLog;