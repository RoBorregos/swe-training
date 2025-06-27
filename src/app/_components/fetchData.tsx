"use client";

import { api } from "~/trpc/react";

export function TestButton() {
  const utils = api.useUtils();
  const { data } = api.leetcode.hasCompletedProblemRecently.useQuery({
    username: "Oscar_gg",
    problemSlug: "final-array-state-after-k-multiplication-operations-i",
  });

  const { data: data2 } = api.leetcode.getProblemById.useQuery({
    problemId: 1024,
  });

  const { data: data3 } = api.leetcode.getProblemBySlug.useQuery({
    slug: data2?.titleSlug ?? "",
  });

  // data 2 === data3

  /*const { data: data4 } = api.leetcode.getQuestionDescription.useQuery({
    titleSlug: data2?.titleSlug ?? "",
  });*/

  console.log("data:", data);
  console.log("data2:", data2);
  console.log("data3:", data3);
  //console.log("data4:", data4);

  return (
    <button
      // onClick={() => utils.post.invalidate()}
      className="text-primary-background rounded-lg bg-primary-foreground p-2 font-main"
    >
      API Health Check
    </button>
  );
}
