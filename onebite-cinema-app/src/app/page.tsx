import SearchableLayout from "@/components/searchable-layout";
import style from "./page.module.css";
import Link from "next/link";
import { MovieData } from "@/types";

async function AllMovies() {
  const response = await fetch(`${process.env.MOVIE_API_BASE_URL}/movie`, {
    cache: "force-cache",
  });

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const allMovies: MovieData[] = await response.json();

  return (
    <div className={style.all_movies_list}>
      {allMovies.map((movie) => (
        <Link
          key={movie.id}
          href={`/movie/${movie.id}`}
          className={style.all_movies_item}
        >
          <img src={movie.posterImgUrl} alt={movie.title} />
        </Link>
      ))}
    </div>
  );
}

async function RecoMovies() {
  const response = await fetch(
    `${process.env.MOVIE_API_BASE_URL}/movie/random`,
    { next: { revalidate: 3 } },
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const recoMovies: MovieData[] = await response.json();

  return (
    <div className={style.recommend_list}>
      {recoMovies.slice(0, 3).map((movie) => (
        <Link
          key={movie.id}
          href={`/movie/${movie.id}`}
          className={style.recommend_movie_item}
        >
          <img src={movie.posterImgUrl} alt={movie.title} />
        </Link>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <SearchableLayout>
      <div className={style.container}>
        <section className={style.recommend_section}>
          <h3>지금 가장 추천하는 영화</h3>
          <RecoMovies />
        </section>
        <section className={style.all_movies_section}>
          <h3>등록된 모든 영화</h3>
          <AllMovies />
        </section>
      </div>
    </SearchableLayout>
  );
}
