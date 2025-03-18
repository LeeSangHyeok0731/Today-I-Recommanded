"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

type Movie = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export default function Details() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "제목 없음";

  const [data, setData] = useState<Movie[]>();

  const apikey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const fetchMoviePeople = async () => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${title}`;
    const options = {
      headers: {
        accept: "application/json",
      },
    };

    try {
      const response = await axios.get(url, options);
      setData(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMoviePeople();
  }, []);

  return (
    <div>
      <h1>{title}</h1>
      {data &&
        data.map((x: Movie) => {
          return (
            <div key={x.id} className="p-4 border-b">
              <h2 className="text-xl font-bold">{x.title}</h2>
              <p className="text-gray-500">{x.release_date}</p>
              <p>{x.overview}</p>
              {x.poster_path && (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${x.poster_path}`}
                  alt={x.title}
                  width={500} // 이미지 원본 크기 설정
                  height={750} // 이미지 원본 크기 설정
                  className="mt-2 rounded-lg"
                  priority // LCP(최대 콘텐츠 페인트) 최적화
                  unoptimized // 외부 URL을 사용하기 때문에 Next.js 이미지 최적화 비활성화 (옵션)
                />
              )}
              <p>
                ⭐ {x.vote_average} ({x.vote_count} votes)
              </p>
            </div>
          );
        })}
    </div>
  );
}
