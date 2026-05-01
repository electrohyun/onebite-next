import { Suspense, type ReactNode } from "react";
import Searchbar from "./searchbar";
import style from "./searchable-layout.module.css";

export default function SearchableLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
      <Suspense fallback={<SearchbarFallback />}>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
}

function SearchbarFallback() {
  return (
    <div className={style.searchbar_contatiner}>
      <input placeholder="검색어를 입력하세요..." disabled />
      <button disabled>검색</button>
    </div>
  );
}
