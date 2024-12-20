"use client";

import { api } from "~/trpc/react";

export function TestButton() {
  const utils = api.useUtils();
  const { data } = api.leetcode.userProblems.useQuery({
    username: "Oscar_gg",
  });

  console.log("data:", data);

  return (
    <button
      onClick={() => utils.post.invalidate()}
      className="text-primary-background rounded-lg bg-primary-foreground p-2 font-main"
    >
      API Tests
    </button>
  );
}
