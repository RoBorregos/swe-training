"use client"

// References check the following link:
// https://alfa-leetcode-api.onrender.com/

/*
We can use the LeetCode API to fetch user data.
such as the following:
https://alfa-leetcode-api.onrender.com/pyoro/acSubmission
Now based on the title and statusDisplay we can check if its the same as the one provided for the week
Add the timestamp traduction from unix to date
Also and initially we can use the timestamp to compare the dates of the week vs the timestamp of the submission
if timestap >= first day of the week so it must appear as done 


*/

import { leetcodeRouter } from "~/server/api/routers/leetcode";
import { api } from "~/trpc/react";

const WeekRoute = () => {
    const {data} = api.leetcode.fullDataRecentlyCompleted.useQuery({username: "pyoro"});
    return ( 
        <main>
            <h1 className="text-white text-3xl font-bold">Week router</h1>
            {data?.map((submission) => (
                <div className="text-white mt-2">
                <h2>Title:{submission.titleSlug}</h2>
                <p>Status: {submission.statusDisplay}</p>
                <p>
                    Date: {new Date(submission.timestamp * 1000).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    })}
                </p>
                </div>
            ))}
        </main>
    );
}
 
export default WeekRoute;