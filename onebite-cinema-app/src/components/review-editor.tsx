"use client";

import { useActionState, useEffect, useRef } from "react";
import style from "./review-editor.module.css";
import { createReviewAction } from "@/actions/create-review.action";

export default function ReviewEditor({ movieId }: { movieId: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    createReviewAction,
    null,
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }

    if (state && state.status) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <section>
      <form ref={formRef} className={style.form_container} action={formAction}>
        <input hidden readOnly name="movieId" value={movieId} />
        <textarea
          disabled={isPending}
          required
          name="content"
          placeholder="리뷰 내용"
        />
        <div className={style.submit_container}>
          <input
            disabled={isPending}
            required
            name="author"
            placeholder="작성자"
          />
          <button disabled={isPending} type="submit">
            {isPending ? "등록 중..." : "작성하기"}
          </button>
        </div>
      </form>
    </section>
  );
}
