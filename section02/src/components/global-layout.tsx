import Link from "next/link";
import type { ReactNode } from "react";
import style from "./global-layout.module.css";

export default function GlobalLayout({ children }: { children: ReactNode }) {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <Link href="/">📚 ONEBITE BOOKS</Link>
      </header>
      <main className={style.main}>{children}</main>
      <footer className={style.footer}>
        본 사이트는 @winterlood님의 강의자료에 기반하여 만들어졌습니다. 작성자:
        @Electrohyun
      </footer>
    </div>
  );
}
