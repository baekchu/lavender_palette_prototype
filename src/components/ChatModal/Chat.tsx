import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './Sidebar.tsx';
import ChatBody from './ChatBody.tsx';
import authState from 'components/zustand/AuthState.tsx';

import './Chat.css';

const ChatModal: React.FC = () => {

    /** 모달 창 출력 관리 */
    const [chatModalOpen, setChatModalOpen] = useState<boolean>(true);

    /** 사이드바 출력 관리 */
    const [openSidebar, setOpenSidebar] = useState(true);

    /** 모달 창 이동 관련 */
    const [start, setStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [position, setPosition] = useState<{ x: number; y: number }>({ x: 400, y: 200 });
    const [isDragging, setIsDragging] = useState(false);

    // useMemo를 사용하여 user 상태를 캐싱
    const { isLoggedIn, user, login, logout } = authState();
    const cachedUser = useMemo(() => user, [user]);

    // 유저 상태 변경 시 업로드, 임시 작성 영역 수정 필요
    useEffect(() => {
        if (!isLoggedIn) {
            login({
                email: 'Jane@test.com',
                image: "https://img3.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/201909/20/xportsnews/20190920191438775cnhj.jpg",
                nickname: 'Jane',
                uid: '0JYWxdeIDCPrr78nab8LZ38yh3u1'
            });
        }
        console.log(user);
    }, [isLoggedIn, login]);


    /************* 모달 창 이동에 대한 함수들   *************/
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        setStart({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging) return;

        const newX = e.clientX - start.x;
        const newY = e.clientY - start.y;

        setPosition({ x: newX, y: newY });
    };

    useEffect(() => {
        /** 마우스가 모달 창 밖으로 나갈 시 클릭 상태 해제 */
        const handleMouseLeave = () => {
            setIsDragging(false);
        };

        const handleWindowMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;

            // Check if the mouse is outside the modal
            const modalElement = document.querySelector('.chatModal');
            if (modalElement) {
                const modalRect = modalElement.getBoundingClientRect();
                if (
                    e.clientX < modalRect.left ||
                    e.clientX > modalRect.right ||
                    e.clientY < modalRect.top ||
                    e.clientY > modalRect.bottom
                ) {
                    setIsDragging(false);
                }
            }
        };

        window.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('mousemove', handleWindowMouseMove);

        return () => {
            window.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('mousemove', handleWindowMouseMove);
        };
    }, [isDragging]);
    /*******************************************************/


    // 현재 열람중인 채팅창 - 상대방의 uid와 닉네임 정보를 담고 있는 오브젝트
    interface RoomInfo {
        roomID: string,
        senderNick: string,
    }
    const [recentRoom, setRecentRoom] = useState<RoomInfo | null>(null);

    // 리턴 함수
    return (
        <>
            {chatModalOpen && (
                <div
                    className={openSidebar ? 'chatModal withSidebar' : 'chatModal'}
                    style={{
                        top: `${position.y}px`,
                        left: `${position.x}px`,
                        cursor: isDragging ? 'move' : 'default',
                        willChange: 'transform',
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                >
                    <div className='chatContainer'>
                        <Sidebar
                            user={user}
                            openSidebar={openSidebar}
                            recentRoom={recentRoom}
                            setRecentRoom={setRecentRoom} />
                        <ChatBody
                            user={user}
                            recentRoom={recentRoom}
                            openSidebar={openSidebar}
                            setOpenSidebar={setOpenSidebar}
                            setChatModalOpen={setChatModalOpen} />
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatModal;
