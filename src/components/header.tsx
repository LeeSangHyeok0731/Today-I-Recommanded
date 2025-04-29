"use client";

import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();
  return (
    <>
      <div onClick={() => router.push("")}>홈으로</div>
      <div onClick={() => router.push("/man")}>남자한테 인기가 많은것</div>
      <div onClick={() => router.push("/woman")}>여자한테 인기가 많은것</div>
    </>
  );
};
