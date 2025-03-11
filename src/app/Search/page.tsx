"use client";

import axios from "axios";
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

  const apiKey =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTY1ZjBkZjY0YmRmNjQ5YzZlZDFhOGY1YWNmYTdmNiIsIm5iZiI6MTc0MTA1NjI4My42LCJzdWIiOiI2N2M2NjkxYjViMWQ4ZDQ4YzUwNGQzMTUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ybizjPAJe8UKFEHNpqmaj323t1KqmS704V5Tet1jEeU";

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

  return (
    <>
      <button onClick={fetchMovieInformation}>비디오 정보 불러오기</button>
      {movieInformation.map((x) => (
        <h1 key={x.id}>{x.title}</h1>
      ))}
    </>
  );
}
