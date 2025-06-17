"use client";

import { MainLogo } from "@/asset";
import { usePathname, useRouter } from "next/navigation";

import * as S from "./header.css";

export const Header = () => {
  const router = useRouter();

  const navigator = (path: string) => {
    router.push(`${path}`);
  };

  const MenuArr = [
    { title: "개요", path: "/" },
    { title: "작품추천 받기", path: "/TIR" },
    { title: "후원하기", path: "/pay" },
    { title: "로그인", path: "/signin" },
  ];

  const currentPath = usePathname();

  return (
    <S.HeaderWrapper>
      <div onClick={() => navigator("/")}>
        <MainLogo />
      </div>
      <S.MenuWrapper>
        {MenuArr.map((x) => {
          return x.path === currentPath ? (
            <S.ClickedMenuText key={x.title}>{x.title}</S.ClickedMenuText>
          ) : (
            <S.MenuText key={x.title}>{x.title}</S.MenuText>
          );
        })}
      </S.MenuWrapper>
    </S.HeaderWrapper>
  );
};
