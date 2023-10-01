"use client";

import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { ImGoogle, ImTwitter, ImFacebook } from "react-icons/im";
import { SiNaver } from "react-icons/si";
import { useRouter } from "next/navigation";

import { toast } from "react-hot-toast";
import useRegisterModal from "../hooks/useRegisterModal";
import useLoginModal from "../hooks/useLoginModal";
import useResetPassword from "../hooks/useResetPasswordModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import IconButton from "../button/IconButton";

import authState from "@/zustand/AuthState";


const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const ResetPasswordModal = useResetPassword();
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const userAuth = authState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // 추가: 입력 필드 초기화 함수
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        console.log(userCredential);
        toast.success(`로그인되었습니다.`);

        const user = userCredential.user;
        userAuth.login(user.uid);

        loginModal.onClose();
      })
      .catch((error) => {
        console.log(error);
        if (
          error.code === "auth/invalid-email" ||
          error.code === "auth/user-not-found"
        ) {
          toast.error("올바르지 않은 이메일입니다.");
        } else if (error.code === "auth/wrong-password") {
          toast.error("비밀번호가 틀렸습니다.");
        } else {
          toast.error("로그인에 실패하였습니다.");
        }
        setIsLoading(false);
      });
  };
  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const onResetToggle = useCallback(() => {
    loginModal.onClose();
    ResetPasswordModal.onOpen();
  }, [loginModal, ResetPasswordModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4 text-[#B25FF3]">
      <Heading
        center
        title="로그인"
        subtitle="당신의 아이디어가 혁신을 일으킵니다."
      />
      <Input
        id="email"
        label="이메일"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="비밀번호"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <div className="flex items-center justify-between">
        <label className="flex gap-2 px-[3px]">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          자동 로그인
        </label>
        <span
          className="text-[#B25FF3] cursor-pointer 
          hover:underline
          ml-3"
          onClick={onResetToggle}
        >
          비밀번호 찾기
        </span>
      </div>
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <div className="flex items-center my-1">
        <hr className="flex-grow border-b-[1px] border-[#e8dbf2]" />
        <div className="mx-4 text-[#B25FF3] text-sm">또는</div>
        <hr className="flex-grow border-b-[1px] border-[#e8dbf2]" />
      </div>
      <div className="text-center mb-3 font-semibold text-[#B25FF3]">
        SNS 계정으로 로그인하기
      </div>
      <div className="flex justify-center gap-10 items-center">
        <IconButton icon={ImGoogle} onClick={() => signIn("google")} />
        <IconButton icon={ImTwitter} onClick={() => signIn("twitter")} />
        <IconButton icon={ImFacebook} onClick={() => signIn("facebook")} />
        <IconButton icon={SiNaver} onClick={() => signIn("naver")} />
      </div>
      <div
        className="
    text-neutral-500 text-center mt-4 font-semibold"
      >
        <p>
          Lavender Palette을 처음 이용하시나요?
          <span
            onClick={onToggle}
            className="
              text-black
              cursor-pointer 
              hover:underline
              ml-3
              
            "
          >
            회원가입
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      actionLabel="로그인"
      onClose={() => {
        // 모달이 닫힐 때 입력 필드 초기화
        reset();
        loginModal.onClose();
      }}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
