"use client";

import { ImGoogle, ImTwitter, ImFacebook } from "react-icons/im";
import { SiNaver } from "react-icons/si";
import { BiSolidErrorCircle } from "react-icons/bi";
import { signIn } from "next-auth/react";
import React, { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import useLoginModal from "../hooks/useLoginModal";
import useRegisterModal from "../hooks/useRegisterModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import IconButton from "../button/IconButton";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("이메일은 필수 입력 사항입니다.")
      .email("유효한 이메일 형식이어야 합니다."),
    password: yup
      .string()
      .required("비밀번호는 필수 입력 사항입니다.")
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "비밀번호는 특수문자, 숫자, 대소문자를 모두 포함해야 합니다."
      ),
    confirmpassword: yup
      .string()
      .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다.")
      .required("비밀번호 확인은 필수 입력 사항입니다."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // 추가: 입력 필드 초기화 함수
  } = useForm<{
    email: string;
    password: string;
    confirmpassword: string;
  }>({
    defaultValues: {
      email: "",
      password: "",
      confirmpassword: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<{
    email: string;
    password: string;
    confirmpassword: string;
  }> = (data) => {
    setIsLoading(true);

    createUserWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
      console.log(userCredential);
      toast.success("회원가입이 완료되었습니다."); // 회원가입 성공 시 토스트 메시지
      registerModal.onClose();
      loginModal.onOpen();
    })
    .catch((error) => {
      let errorMessage = "";

      if (error.code === "auth/weak-password") {
        errorMessage = "비밀번호가 너무 약합니다.";
      } else if (error.code === "auth/email-already-in-use") {
        errorMessage = "이미 사용 중인 이메일 주소입니다.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "올바르지 않은 이메일 형식입니다.";
      } else {
        errorMessage = "알 수 없는 에러가 발생했습니다.\n" + error;
      }

      toast.error(errorMessage); // 실패 시 에러 메시지 토스트
    })
    .finally(() => {
      setIsLoading(false);
    });
};

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4 text-[#B25FF3]">
      <Heading
        center
        title="회원가입"
        subtitle="상상력은 현실을 뛰어넘는 날개입니다."
      />
      <Input
        id="email"
        label="이메일"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      {errors.email && (
        <span className="text-red-400 text-[13px] flex items-center justify">
          <BiSolidErrorCircle />
          {errors.email.message}
        </span>
      )}
      <Input
        id="password"
        label="비밀번호"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      {errors.password && (
        <span className="text-red-400 text-[13px] flex items-center justify">
          <BiSolidErrorCircle />
          {errors.password.message}
        </span>
      )}

      <Input
        id="confirmpassword"
        label="비밀번호 확인"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      {errors.confirmpassword && (
        <span className="text-red-400 text-[13px] flex items-center justify">
          <BiSolidErrorCircle />
          {errors.confirmpassword.message}
        </span>
      )}
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
          text-neutral-500 
          text-center 
          mt-4 
          font-semibold
        "
      >
        <p>
          이미 계정이 있습니까?
          <span
            onClick={onToggle}
            className="
              text-black
              cursor-pointer 
              hover:underline
              ml-3
            "
          >

            로그인
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      actionLabel="회원가입"
      onClose={()=>{
        reset();
        registerModal.onClose();
      }}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
