"use client";

import React, { useCallback, useState, useEffect } from "react";
import { PiBellSimpleDuotone, PiEnvelopeDuotone } from "react-icons/pi";
import { GiHamburgerMenu } from "react-icons/gi";
import authState from "@/components/zustand/AuthState";

import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "../hooks/useRegisterModal";
import useLoginModal from "../hooks/useLoginModal";

const UserMenu = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isOpen, setIsOpen] = useState(false);
  const auth = authState();
  

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const handleMenuItemClick = () => {
    toggleOpen(); // Close the menu when a MenuItem is clicked
  };

  
  return (
    <div className="relative">
      <div className="flex flex-row items-center xs:gap-3 gap-1">
        <button
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
        >
          <PiBellSimpleDuotone />
        </button>
        <button
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
            <Avatar src={auth?.user?.image} />
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
                <MenuItem label="마이 페이지" onClick={() => {}} />
                <MenuItem label="My favorites" onClick={() => {}} />
                <MenuItem label="My reservations" onClick={() => {}} />
                <MenuItem label="My properties" onClick={() => {}} />
                <MenuItem label="Airbnb your home" onClick={() => {}} />
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
  );
};

export default UserMenu;
