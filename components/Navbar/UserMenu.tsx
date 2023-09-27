"use client";
/** 알람, 메세지, 로그인 폼에 대한 코드 */

import React, { useCallback, useState, useEffect } from "react";
import { PiBellSimpleDuotone, PiEnvelopeDuotone } from "react-icons/pi";
import { GiHamburgerMenu } from "react-icons/gi";
import authState from "@/zustand/AuthState";
import { useRouter } from 'next-navigation';

import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "../hooks/useRegisterModal";
import useLoginModal from "../hooks/useLoginModal";

import Notice from '@/src/components/NoticeModal/NoticeModal';
import Chat from '@/src/components/ChatModal/Chat';

const UserMenu = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isOpen, setIsOpen] = useState(false);
  const auth = authState();
  const navigation = useRouter();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const handleMenuItemClick = () => {
    toggleOpen(); // Close the menu when a MenuItem is clicked
  };

  // 알림창 출력
  const [isNoticeOpen, setIsNoticeOpen] = useState<boolean>(false);

  // 채팅창 출력
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);


  return (
    <>
      <Notice
        type={'alerm'}
        chatModalOpen={isNoticeOpen}
        setChatModalOpen={setIsNoticeOpen}
      />

      <Chat
        chatModalOpen={isChatOpen}
        setChatModalOpen={setIsChatOpen}
      />

      <div className="relative">
        <div className="flex flex-row items-center xs:gap-3 gap-1">
          <button
            // 알림 버튼
            className="
          block
          text-xl
          font-semibold 
          py-2
          px-2 
          rounded-full 
          hover:bg-neutral-100 
          transition 
          cursor-pointer
          text-primary-purple
        "
            onClick={() => { setIsNoticeOpen(!isNoticeOpen); }}
          >
            <PiBellSimpleDuotone />
          </button>
          <button
            // 메세지 버튼
            className="
            block
            text-[1.4rem]
            font-semibold 
            py-2
            px-2 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
            text-primary-purple
          "
            onClick={() => { setIsChatOpen(!isChatOpen); }}
          >
            <PiEnvelopeDuotone />
          </button>
          <div
            onClick={toggleOpen}
            className="
          xs:p-2
          p-1
          md:py-1
          md:px-1.5
          border-[2px] 
          border-[#96BFEE]
          flex 
          flex-row 
          items-center 
          xs:gap-2
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
          >
            <div className="hidden md:block">
              <Avatar src={auth?.user?.profImg} />
            </div>
            <div className=" text-[#96BFEE] flex-row items-center text-xl">
              {auth?.isLoggedIn ? (
                <GiHamburgerMenu />
              ) : (
                <div className=" text-[#96BFEE] flex-row items-center xs:text-sm text-[5px] font-semibold ">
                  로그인
                </div>
              )}
            </div>
          </div>
        </div>
        {isOpen && (
          <div
            className="
            z-[10]
            absolute 
            rounded-xl 
            shadow-md
            w-[140px]
            md:w-[100%]
            bg-[#ffffff94]
            backdrop-blur-[0.5rem]
            overflow-hidden 
            right-0 
            top-18
            text-sm
          "
          >
            <div className="flex flex-col cursor-pointer">
              {auth?.isLoggedIn ? (
                <>
                  <MenuItem label="마이 페이지" onClick={() => {navigation.push("./myPage")}} />
                  <MenuItem label="My favorites" onClick={() => { }} />
                  <MenuItem label="My reservations" onClick={() => { }} />
                  <MenuItem label="My properties" onClick={() => { }} />
                  <MenuItem label="Airbnb your home" onClick={() => { }} />
                  <hr className="border-b-[0.5px] border-[#e8dbf2]" />
                  <MenuItem
                    label="로그아웃"
                    onClick={() => {
                      auth?.logout();
                      handleMenuItemClick();
                    }}
                  />
                </>
              ) : (
                <>
                  <div className="text-red-500">
                    <MenuItem
                      label="회원가입"
                      onClick={() => {
                        registerModal.onOpen();
                        handleMenuItemClick();
                      }}
                    />
                  </div>
                  <MenuItem
                    label="로그인"
                    onClick={() => {
                      loginModal.onOpen();
                      handleMenuItemClick();
                    }}
                  />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserMenu;
