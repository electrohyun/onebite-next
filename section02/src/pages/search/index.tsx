import BookItem from "@/components/book-item";
import SearchableLayout from "@/components/searchable-layout";
import books from "@/mock/books.json";
import type { ReactNode } from "react";

export default function Page() {
  return (
    <div>
      {books.map((book) => {
        return <BookItem key={book.id} {...book} />;
      })}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
