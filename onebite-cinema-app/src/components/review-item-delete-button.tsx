"use client";

import { deleteReviewAction } from "@/actions/delete-review.action";
import { useActionState, useEffect, useRef } from "react";
import style from "./review-item.module.css";

export default function ReviewItemDeleteButton({
  reviewId,
  movieId,
}: {
  reviewId: number;
  movieId: number;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    deleteReviewAction,
    null,
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction}>
      <input readOnly name="reviewId" value={reviewId} hidden />
      <input readOnly name="movieId" value={movieId} hidden />
      {isPending ? (
        <div>...</div>
      ) : (
        <div
          className={style.delete_btn}
          onClick={() => formRef.current?.requestSubmit()}
        >
          🗑️ 리뷰 삭제하기
        </div>
      )}
    </form>
  );
}
