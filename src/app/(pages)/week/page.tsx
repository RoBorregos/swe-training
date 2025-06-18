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

import { leetcodeTestRouter } from "~/server/api/routers/leetcodeTest";

const WeekRoute = () => {
    return ( 
        <main>
            <h1>Week router</h1>
            <p>leetcodeTestRouter.allSubmissions({ "pyoro" })</p>
            
        </main>
    );
}
 
export default WeekRoute;