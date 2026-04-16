import SearchableLayout from "@/components/searchable-layout";
import { useEffect, useState, type ReactNode } from "react";
import style from "./index.module.css";
import Link from "next/link";
import { MovieData } from "@/types";
import fetchMovies from "@/lib/fetch-movies";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Page() {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const router = useRouter();
  const q = router.query.q;

  const fetchSearchResult = async () => {
    const data = await fetchMovies(q as string);
    setMovies(data);
  };

  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q]);

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
        <section className={style.search_result_section}>
          <div className={style.search_result_list}>
            {movies.map((movie) => {
              return (
                <Link
                  key={movie.id}
                  href={`/movie/${movie.id}`}
                  className={style.search_result_item}
                >
                  <img src={movie.posterImgUrl} />
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
