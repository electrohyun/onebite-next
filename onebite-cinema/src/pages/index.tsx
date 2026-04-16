import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import type { ReactNode } from "react";
import Link from "next/link";
import fetchMovies from "@/lib/fetch-movies";
import fetchRandomMovies from "@/lib/fetch-random-movies";
import { MovieData } from "@/types";
import Head from "next/head";
import { useRouter } from "next/router";

export const getStaticProps = async () => {
  const [allMovies, recoMovies] = await Promise.all([
    fetchMovies(),
    fetchRandomMovies(),
  ]);

  return {
    props: {
      allMovies,
      recoMovies,
    },
    revalidate: 3,
  };
};

export default function Home({
  allMovies,
  recoMovies,
}: {
  allMovies: MovieData[];
  recoMovies: MovieData[];
}) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>한입 시네마</title>
          <meta property="og:image" content="/thumbnail.png" />
          <meta property="og:title" content="한입 시네마" />
          <meta
            property="og:description"
            content="한입 시네마에 등록된 영화들을 만나보세요!"
          />
        </Head>
        <div>로딩 중...</div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>한입 시네마</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입 시네마" />
        <meta
          property="og:description"
          content="한입 시네마에 등록된 영화들을 만나보세요!"
        />
      </Head>
      <div className={style.container}>
        <section className={style.recommend_section}>
          <h3>지금 가장 추천하는 영화</h3>
          <div className={style.recommend_list}>
            {recoMovies.slice(0, 3).map((movie) => (
              <Link
                key={movie.id}
                href={`/movie/${movie.id}`}
                className={style.recommend_movie_item}
              >
                <img src={movie.posterImgUrl} />
              </Link>
            ))}
          </div>
        </section>
        <section className={style.all_movies_section}>
          <h3>등록된 모든 영화</h3>
          <div className={style.all_movies_list}>
            {allMovies.map((movie) => (
              <Link
                key={movie.id}
                href={`/movie/${movie.id}`}
                className={style.all_movies_item}
              >
                <img src={movie.posterImgUrl} />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
