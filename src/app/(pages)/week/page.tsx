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
    const {data} = api.leetcode.hasCompletedProblemRecently.useQuery({username: "pyoro", problemSlug: "3sum"});
    return ( 
        <main>
            <h1 className="text-white"> Week router </h1>
            <p className="text-white"> {JSON.stringify(data,null)}</p>
        </main>
    );
}
 
export default WeekRoute;