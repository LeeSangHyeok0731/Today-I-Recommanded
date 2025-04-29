"use client";

import { useEffect, useState } from "react";

export const ManRating = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:4000/manrating"); // 🔥 수정

        if (!response.ok) {
          throw new Error("데이터를 불러오는데 실패했습니다");
        }

        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>데이터를 불러오는 중...</p>;
  if (error) return <p>오류: {error}</p>;

  return (
    <div>
      <h2>남자 평점 데이터</h2>
      <ul>
        {data.map((item: any, index: number) => (
          <li key={index}>
            {item.TITLE}: {item.RATING}
          </li>
        ))}
      </ul>
    </div>
  );
};
