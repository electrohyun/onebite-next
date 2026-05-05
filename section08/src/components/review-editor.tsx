"use client";

import { useActionState, useEffect } from "react";
import style from "./review-editor.module.css";
import { createReviewAction } from "@/actions/create-review.action";

export default function ReviewEditor({ bookId }: { bookId: string }) {
  const [state, formAction, isPending] = useActionState(
    createReviewAction,
    null,
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <section>
      <form className={style.form_container} action={formAction}>
        <input hidden readOnly name="bookId" value={bookId} />
        <textarea
          disabled={isPending}
          required
          name="content"
          placeholder="리뷰를 입력하세요"
        />
        <div className={style.submit_container}>
          <input
            disabled={isPending}
            required
            name="author"
            placeholder="작성자를 입력하세요"
          />
          <button disabled={isPending} type="submit">
            {isPending ? "등록 중..." : "작성하기"}
          </button>
        </div>
      </form>
    </section>
  );
}
