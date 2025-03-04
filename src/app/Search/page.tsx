import axios from "axios";

const movieId = 11;
const apiKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTY1ZjBkZjY0YmRmNjQ5YzZlZDFhOGY1YWNmYTdmNiIsIm5iZiI6MTc0MTA1NjI4My42LCJzdWIiOiI2N2M2NjkxYjViMWQ4ZDQ4YzUwNGQzMTUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ybizjPAJe8UKFEHNpqmaj323t1KqmS704V5Tet1jEeU";

// 영화 세부 정보를 가져오는 함수
const fetchMovieDetails = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    console.log(response.data);
  } catch (error) {
    console.error("Error fetching movie details:", error);
  }
};

// 영화 비디오 정보를 가져오는 함수
const fetchMovieVideos = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/videos`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    console.log(response.data);
  } catch (error) {
    console.error("Error fetching movie videos:", error);
  }
};

export default function Search() {
  fetchMovieDetails();
  fetchMovieVideos();
  return (
    <>
      <button onClick={fetchMovieDetails}>세부정보 불러오기</button>
      <button onClick={fetchMovieVideos}>비디오 정보 불러오기</button>
    </>
  );
}
