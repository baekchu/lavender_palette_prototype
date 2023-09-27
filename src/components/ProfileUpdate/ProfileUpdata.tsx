"use client"
// 회원가입하여 등록된 프로필 정보가 없거나 프로필 수정을 위해 진입했을 경우 접근 가능 


/* [ 입력받는 내용 ]
 *      닉네임
        프로필 사진
        자기소개
        관심 태그
        생년월일
        (비즈니스 연락처)
        (외부 웹사이트 링크)
 */

import React, { useState, useEffect } from "react"
import { auth, db } from "@/Firebase/firebaseConfig";
import { doc, setDoc } from 'firebase/firestore';
import authState from "@/zustand/AuthState";

interface UpdateProps {
    nickname: string,       // 닉네임
    profImg: string,        // 프로필 사진
    introduction: string,   // 자기소개
    interestTags: string[], // 관심 태그
    birth: string,            // 생일
    contactInfo: string,    // 비즈니스 연락처
    externalLink: string,   // 외부 웹사이트 링크
};

const ProfileUpdate = () => {
    const { isLoggedIn, user, login, logout, refresh } = authState();
    // 수정 필요
    const [userUID, setUserUID] = useState<string>(auth?.currentUser?.uid ?? "jbeS7IFPrkkhoOGb2Lbe");
    const initData = {
        nickname: "",
        profImg: "",
        introduction: "",
        interestTags: [],
        birth: "",
        contactInfo: "",
        externalLink: "",
    };
    const [tempData, setTempData] = useState<UpdateProps>(initData);

    // 태그관리 ******************************************************
    const [newTag, setNewTag] = useState<string>("");
    const addTag = (inputTag: string) => {
        if (tempData.interestTags.length >= 10) return;
        if (tempData.interestTags.includes(inputTag)) {
            console.log("태그가 중복됨");
            return;
        }

        const updatedTags = [...tempData.interestTags, inputTag];
        setTempData({
            ...tempData,
            interestTags: updatedTags,
        });
        setNewTag("");
    };


    // 기존 user에 정보가 있으면 가져오기. 없으면 빈칸 *******************
    useEffect(() => {
        if (user?.nickname && user?.interestTags.length > 0) {

            setTempData({
                nickname: user?.nickname ?? "",
                profImg: user?.profImg ?? "",
                introduction: user?.introduction ?? "",
                interestTags: user?.interestTags ?? [],
                birth: user?.birth ?? "",
                contactInfo: user?.contactInfo ?? "",
                externalLink: user?.externalLink ?? "",
            });
        }
    }, []);


    // 서브밋 ******************************************************
    // 저장할 때 한번 물어보는 거 추가해도 될듯
    const SubmitData = (event: React.FormEvent) => {
        event.preventDefault();
        const userDataRef = doc(db, "UserData", userUID);
        setDoc(userDataRef, tempData).then(() => {
            console.log("성공적으로 업데이트됨!");
            refresh(userUID);
        }).catch((e) => console.log(e, 'uid 오류'));
        refresh(userUID);
        setTempData(initData);
    };


    // 취소 **********************************************************
    const cancleUpdate = () => {
        console.log("취소");
        setTempData(initData);
    }




    // ********** R E T U R N ************************************************
    return (
        <div>
            profile update

            <form>
                <div>
                    닉네임*
                    <input
                        value={tempData.nickname}
                        onChange={(e) => {
                            setTempData({
                                ...tempData,
                                nickname: e.target.value,
                            });
                        }}
                    />
                </div>
                <div>
                    프로필 사진
                    <input
                        value={tempData.profImg}
                        onChange={(e) => {
                            setTempData({
                                ...tempData,
                                profImg: e.target.value,
                            });
                        }} />
                </div>
                <div>
                    자기소개
                    <textarea
                        placeholder="자기소개"
                        value={tempData.introduction}
                        onChange={(e) => {
                            setTempData({
                                ...tempData,
                                introduction: e.target.value,
                            });
                        }} />
                </div>
                <div>
                    관심 태그*
                    <input
                        value={newTag || ''}
                        onChange={(e) => { setNewTag(e.target.value); }}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' && newTag) {
                                e.preventDefault();
                                // Enter 키를 누르고 입력한 태그가 비어있지 않을 때
                                addTag(newTag);
                            }
                        }}
                    />
                </div>
                <div>
                    {tempData.interestTags.map((tag, index) => (
                        <div key={index}>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    const updatedTags = [...tempData.interestTags];
                                    updatedTags.splice(index, 1); // 선택한 태그를 배열에서 제거
                                    setTempData({
                                        ...tempData,
                                        interestTags: updatedTags,
                                    });
                                }}
                            >
                                {tag}
                            </button>
                        </div>
                    ))}
                </div>
                <div>
                    생년월일*
                    <input
                        type="date"
                        value={tempData.birth}
                        onChange={(e) => {
                            const dateValue = (e.target.value).toString();
                            setTempData({
                                ...tempData,
                                birth: dateValue,
                            });
                        }} />
                </div>
                <div>
                    비즈니스 연락처
                    <input
                        value={tempData.contactInfo}
                        onChange={(e) => {
                            setTempData({
                                ...tempData,
                                contactInfo: e.target.value,
                            });
                        }} />
                </div>
                <div>
                    외부 웹사이트 주소
                    <input
                        value={tempData.externalLink}
                        onChange={(e) => {
                            setTempData({
                                ...tempData,
                                externalLink: e.target.value,
                            });
                        }} />
                </div>

                <button onClick={(e)=>{SubmitData(e)}}>저장</button>
                <button onClick={() => cancleUpdate()}>취소</button>
            </form>
        </div>
    );
};

export default ProfileUpdate;