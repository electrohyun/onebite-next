"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import style from "./searchable-layout.module.css";

export default function Searchbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const [search, setSearch] = useState(q);

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className={style.searchbar_contatiner}>
      <input
        value={search}
        onKeyDown={onKeyDown}
        onChange={onChangeSearch}
        placeholder="검색어를 입력하세요..."
      />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
}
