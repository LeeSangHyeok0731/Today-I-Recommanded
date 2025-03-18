"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components"; // styled-components 임포트

type Genre = {
  id: number;
  name: string;
};

type ProductionCompany = {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
};

type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

type Movie = {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: null | object;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

const Container = styled.div`
  padding: 16px;
`;

const MovieTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
`;

const MovieReleaseDate = styled.p`
  color: #6b7280; // Gray color (tailwind's text-gray-500 equivalent)
`;

const MovieOverview = styled.p`
  margin-top: 8px;
`;

const PosterImage = styled(Image)`
  margin-top: 16px;
  border-radius: 8px;
`;

const Rating = styled.p`
  margin-top: 8px;
`;

const GenreContinaer = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  align-items: space-between;
  justify-content: space-between;
`;

export default function Details() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [data, setData] = useState<Movie | null>(null);

  const apikey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const fetchMovieDetails = async () => {
    if (!id) return;

    const movieId = Number(id);
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apikey}`;
    const options = {
      headers: {
        accept: "application/json",
      },
    };

    try {
      const response = await axios.get(url, options);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <div key={data.id} className="border-b">
        <MovieTitle>{data.title}</MovieTitle>
        <MovieReleaseDate>{data.release_date}</MovieReleaseDate>
        <MovieOverview>{data.overview}</MovieOverview>
        <GenreContinaer>
          {data.genres.map((x) => {
            return <p key={x.id}>{x.name}</p>;
          })}
        </GenreContinaer>
        {data.poster_path && (
          <PosterImage
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            alt={data.title}
            width={500}
            height={750}
            priority
            unoptimized
          />
        )}
        <Rating>
          ⭐ {data.vote_average} ({data.vote_count} votes)
        </Rating>
      </div>
    </Container>
  );
}
