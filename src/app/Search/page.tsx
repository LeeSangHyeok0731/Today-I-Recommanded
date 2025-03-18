"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type MovieInformation = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export default function Search() {
  const [movieInformation, setMovieInformation] = useState<MovieInformation[]>(
    []
  );

  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  // 영화 비디오 정보를 가져오는 함수
  const fetchMovieInformation = async () => {
    const url =
      "https://api.themoviedb.org/3/movie/top_rated?language=ko&page=1";
    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };
    try {
      const response = await axios.get(url, options);
      setMovieInformation(response.data.results); // 결과 배열을 설정
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  useEffect(() => {
    fetchMovieInformation();
  }, []);

  const router = useRouter();

  const handleClick = (title: string) => {
    router.push(`detail?title=${encodeURIComponent(title)}`);
  };

  return (
    <>
      <button onClick={fetchMovieInformation}>비디오 정보 불러오기</button>
      {movieInformation.map((x) => (
        <p
          key={x.id}
          title={x.title}
          onClick={() => handleClick(x.original_title)}
        >
          {x.title}
        </p>
      ))}
    </>
  );
}
