"use server";

import { updateTag } from "next/cache";

type ActionState = {
  status: boolean;
  error: string;
};

export async function deleteReviewAction(
  _: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  const reviewId = formData.get("reviewId")?.toString();
  const movieId = formData.get("movieId")?.toString();

  if (!reviewId || !movieId) {
    return {
      status: false,
      error: "삭제할 리뷰 정보가 없습니다.",
    };
  }

  try {
    const response = await fetch(
      `${process.env.MOVIE_API_BASE_URL}/review/${reviewId}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // Next.js 강의 코드: revalidateTag(`review-${movieId}`);
    updateTag(`review-${movieId}`);

    return {
      status: true,
      error: "",
    };
  } catch (err) {
    console.error(err);

    return {
      status: false,
      error: "리뷰 삭제에 실패했습니다.",
    };
  }
}
