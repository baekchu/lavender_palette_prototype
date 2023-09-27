import React, { useState, useEffect, useRef, useMemo } from "react";
import { auth, db } from "@/Firebase/firebaseConfig";
import authState from "@/zustand/AuthState";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

interface UserDataProps {
    // 필수 데이터는 별표(*)로 표시
    // [[ 고정 데이터]]
    uid: string,            // 계정 uid*
    email: string,          // 이메일*
    birth: string,            // 생일*

    // [[ 직접 수정 불가 데이터 ]] ----------------- 별도의 계산 함수 필요
    likes: number,          // 누적 좋아요
    artworks: string[],     // 등록한 작품의 링크
    messageRooms: string[],  // 참가한 채팅방
    followers: string[],    // 이 유저를 팔로우 하는 사람들
    following: string[],    // 유저가 팔로우 하는 사람들

    // [[ 직접 수정 가능 데이터 ]]
    nickname: string,       // 닉네임*
    profImg: string,        // 프로필 사진
    introduction: string,   // 자기소개
    interestTags: string[], // 관심 태그*
    contactInfo: string,    // 비즈니스 연락처
    externalLink: string,   // 외부 웹사이트 링크

    // 인덱스 시그니처
    [key: string]: string | string[] | number | Date;
}

const UserData = () => {
    const { isLoggedIn, user, login, logout, refresh } = authState();
    const cachedUser = useMemo(() => user, [user]);

    // A) UID 가져오기 ******************************************************
    // 로그인 후 uid 가져오는 동작 구현 필요
    const [userUID, setUserUID] = useState<string | null>();


    // B) 프로필 정보 서버에 저장하기 
    // B - 1) 첫 정보 저장 ==> 회원가입 할 때 실행되어야 하는 부분******************
    const [newUserData, setNewUserData] = useState<UserDataProps>({
        // 수정 불가 변수
        uid: userUID ?? "0JYWxdeIDCPrr78nab8LZ38yh3u1",   // auth에서 불러오기
        email: user?.email ?? "test0826@gmail.com",       // auth에서 불러오기
        likes: 0,
        artworks: [],
        messageRooms: [],
        followers: [],
        following: [],

        // 입력 변수 - 닉네임, 프로필 사진, 자기소개, 관심 태그
        birth: "",
        nickname: "",
        profImg: "",
        introduction: "",
        interestTags: [],
        contactInfo: "",    // 비즈니스 연락처
        externalLink: "",
    });

    // B - 2) 서버 데이터 수정 **********************************************************
    const [updateUserData, setUpdateUserData] = useState<UserDataProps | null>(null);
    const userDataUpdate = (data: UserDataProps) => {  // 현재 접속된 uid에 데이터 업데이트
        if (!userUID) {
            console.log("UID가 가져와지지 않음");
            return;
        };
        const userDataRef = doc(db, "UserData", userUID);
        setDoc(userDataRef, data)
            .then(() => {
                console.log("성공적으로 업데이트됨!");
            })
            .catch((error) => { console.error(error) });
        refresh(userUID);
    }


    // *************************** R E T U R N ******************************
    return (
        <>
            {/** 회원 가입 시 입력하는 정보 *********************************/}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    userDataUpdate(newUserData);
                }}
            >
                <h3>회원가입</h3>
                <div>
                    <label htmlFor="nickname">닉네임:</label>
                    <input
                        type="text"
                        id="nickname"
                        name="nickname"
                        value={newUserData?.nickname || ""}
                        onChange={(e) => {
                            setNewUserData({
                                ...newUserData,
                                nickname: e.target.value,
                            });
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="profImg">프로필 사진:</label>
                    <input
                        type="string"
                        id="profImg"
                        name="profImg"
                        value={newUserData?.profImg}
                        onChange={(e) => {
                            setNewUserData({
                                ...newUserData,
                                profImg: e.target.value,
                            });
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="introduction">자기소개:</label>
                    <input
                        type="string"
                        id="introduction"
                        name="introduction"
                        value={newUserData?.introduction}
                        onChange={(e) => {
                            setNewUserData({
                                ...newUserData,
                                introduction: e.target.value,
                            });
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="interestTags">관심 태그:</label>
                    <input
                        type="string"
                        id="interestTags"
                        name="interestTags"
                        value={newUserData?.interestTags}
                        onChange={(e) => {
                            setNewUserData({
                                ...newUserData,
                                interestTags: [e.target.value],
                            });
                        }}
                    />
                </div>
                <button type="submit">프로필 정보 등록</button>
            </form>
            <hr />

            {/** 데이터 보여주기 *****************************************/}
            <div>
                <h3>등록 정보 조회</h3>
                {user ? (
                    <>
                        {Object.keys(user).map((key) => (
                            <p key={key}>
                                {key}
                            </p>
                        ))}
                    </>
                ) : (
                    "null"
                )}
            </div>

            <hr />

            {/** 데이터 수정 *********************************************/}
            <div>
                <h3>데이터 수정</h3>

                <button onClick={async () => {
                    setUpdateUserData(user);
                }}>수정</button>

                {updateUserData && (
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        userDataUpdate(updateUserData);
                    }}>
                        <div>
                            <label htmlFor="nickname">닉네임:</label>
                            <input
                                type="string"
                                id="nickname"
                                name="nickname"
                                value={updateUserData.nickname}
                                onChange={(e) => {
                                    setUpdateUserData({
                                        ...updateUserData,
                                        nickname: e.target.value,
                                    });
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor="profImg">프로필 사진:</label>
                            <input
                                type="string"
                                id="profImg"
                                name="profImg"
                                value={updateUserData.profImg}
                                onChange={(e) => {
                                    setUpdateUserData({
                                        ...updateUserData,
                                        profImg: e.target.value,
                                    });
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor="introduction">자기소개:</label>
                            <input
                                type="string"
                                id="introduction"
                                name="introduction"
                                value={updateUserData.introduction}
                                onChange={(e) => {
                                    setUpdateUserData({
                                        ...updateUserData,
                                        introduction: e.target.value,
                                    });
                                }}
                            />
                        </div>
                        <button type="submit">수정하기</button>
                    </form>
                )}
            </div>
        </>
    );
}

export default UserData;