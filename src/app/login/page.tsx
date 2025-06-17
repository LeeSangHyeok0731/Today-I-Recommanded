"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import * as S from "./style";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "이메일을 입력해주세요.")
    .refine(
      (value) =>
        /^[sS]\d{2}0\d{2}$/.test(value) ||
        /^[sS]\d{2}0\d{2}@gsm\.hs\.kr$/.test(value),
      {
        message: "올바른 형식의 이메일을 입력하세요.",
      }
    ),
  password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <S.Field>
        <S.Label htmlFor="email">이메일</S.Label>
        <S.Input id="email" type="email" {...register("email")} />
        {errors.email && <S.ErrorMsg>{errors.email.message}</S.ErrorMsg>}
      </S.Field>

      <S.Field>
        <S.Label htmlFor="password">비밀번호</S.Label>
        <S.Input id="password" type="password" {...register("password")} />
        {errors.password && <S.ErrorMsg>{errors.password.message}</S.ErrorMsg>}
      </S.Field>

      <S.Button type="submit">로그인</S.Button>
    </S.Form>
  );
}
