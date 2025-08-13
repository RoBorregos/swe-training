import Link from "next/link";
import AdminContributions from "~/app/_components/resources/adminContributions";

import { AdminOnly } from "~/app/_components/resources/isAdmin";
import { api } from "~/trpc/react";
import { useState } from "react";
import Resume from "./resume";

const ResourceContent = ({ topic}: { topic: string; }) => {
    const [extraContent, setExtraContent] = useState("");
    const utils = api.useUtils();
    
    const { data: additionalContent } = api.resource.getAdditionalContent.useQuery({ topic });
    
    const addContent = api.resource.addContent.useMutation();

    const handleSubmit = async () => {
        if (extraContent.trim()) {
            await addContent.mutateAsync({ topic, content: extraContent });
            setExtraContent("");
            await utils.resource.getAdditionalContent.invalidate({ topic });
        }
    };
  switch (topic) {
    case "Resources Page":
      return (
        <>
          <h2 className="text-2xl font-bold mb-3">Welcome to the Resources Page</h2>
            <p className="mb-2">
                Here you will find curated materials and explanations to help you master core concepts in algorithms and data structures.
                Whether you are preparing for interviews, studying for exams, or just curious, this page is your starting point.
            </p>
                <ul className="list-disc pl-6 mb-2">
                    <li>Explore detailed guides on algorithmic techniques and data structures.</li>
                    <li>Access hand-picked practice problems and quizzes.</li>
                    <li>Find links to trusted external resources for deeper learning.</li>
                </ul>
            <p className="mb-2">
                If you have questions, suggestions, or need additional resources, please contact Hector.
            </p>
        </>
      );

    case "Resume":
        return (
            <Resume/>
        )
    case "Complexities and Analysis of Algorithm":
      return (
        <>
          <h2 className="text-xl font-semibold mb-2">Why is Analysis of Algorithm important?</h2>
            <ul className="list-disc pl-6 mt-3">
                <li>To predict the behavior of an algorithm for large inputs.</li>
                <li>Helps avoid constant testing with each change.</li>
                <li>Allows us to compare multiple solutions effectively.</li>
            </ul>

          <h2 className="text-xl font-semibold mt-6 mb-2">Big O Notation</h2>
            <p>
                Big O notation describes the upper bound of time or space complexity as input size grows. It is written as O(f(n)).
            </p>

            <AdminContributions content={additionalContent ?? []} />
            <AdminOnly topic={topic} value={extraContent} onChangeAction={setExtraContent} onSubmitAction={handleSubmit}/>

          <h2 className="text-white font-bold text-2xl mt-4"> Here are some resources</h2>
            <ul className="list-disc pl-6 mt-2">
                <li>
                    <Link href="https://www.geeksforgeeks.org/analysis-of-algorithms/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                        Analysis of Algorithms
                    </Link>
                </li>
                <li>
                    <Link href="https://www.geeksforgeeks.org/understanding-time-complexity-simple-examples/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                        Understanding Time Complexity with Simple Examples
                    </Link>
                </li>
                <li>
                    <Link href="https://www.geeksforgeeks.org/dsa/g-fact-86/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                        What does Space Complexity mean?
                    </Link>
                </li>
                <li>
                    <Link href="https://www.geeksforgeeks.org/examples-of-big-o-analysis/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                        Examples of Big-O analysis
                    </Link>
                </li>
                <li>
                    <Link href="https://www.geeksforgeeks.org/dsa/practice-questions-time-complexity-analysis/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                        Practice Questions on Time Complexity Analysis
                    </Link>
                </li>
                <li>
                    <Link href="https://www.geeksforgeeks.org/quizzes/quiz-on-complexity-analysis-for-dsa/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                        Quiz on Complexity analysis for DSA
                    </Link>
                </li>
            </ul>
        </>
      );

    case "Arrays":
        return (
            <>
                <p>
                    An array is a fundamental data structure that stores a fixed-size sequence of elements of the same type in contiguous memory. This allows constant-time access to elements using their index.
                </p>
                <p>
                    Arrays are efficient for accessing and iterating over data but have limitations: their size is immutable once declared, and inserting or removing elements requires shifting other elements, which can be costly.
                </p>

                <AdminContributions content={additionalContent ?? []} />
                <AdminOnly topic={topic} value={extraContent} onChangeAction={setExtraContent} onSubmitAction={handleSubmit}/>
                
                <h2 className="text-white font-bold text-2xl mt-4"> Here are some resources</h2>
                    <ul className="list-disc pl-6 mt-2">
                        <li>
                            <Link href="https://www.geeksforgeeks.org/introduction-to-arrays-data-structure-and-algorithm-tutorials/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Getting Started with Array Data Structure
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/dsa/array-data-structure-guide/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Array Data Structure Guide
                            </Link>
                        </li>
                        <li>
                            <Link href="hhttps://www.w3schools.com/dsa/dsa_data_arrays.php" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                DSA Arrays
                            </Link>
                        </li>
                    </ul>
                <h2 className="text-white font-bold text-xl mt-4"> LeetCode Problems </h2>
                    <ul className="list-disc pl-6 mt-2">
                        <li>
                            <Link href="https://leetcode.com/problem-list/array/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Array LeetCode Problems
                            </Link>
                        </li>
                    </ul>
            </>
        );

    case "Searching Algorithms":
      return (
        <>
            <p>
            Searching algorithms are fundamental techniques used to find specific elements within data structures such as arrays, trees, or graphs.
            They are crucial in computer science for tasks like looking up records in databases or navigating paths in maps.
            Basic algorithms include <strong>Linear Search</strong>, which checks each element one by one, and <strong>Binary Search</strong>, which efficiently splits the search space in half (but requires sorted data).
            More advanced strategies like <strong>Breadth-First Search (BFS)</strong> and <strong>Depth-First Search (DFS)</strong> are often used in graph traversal and tree structures.
            Understanding the time and space complexity of each algorithm is essential to choosing the right one for a given problem.
            </p>

            <AdminContributions content={additionalContent ?? []} />
            <AdminOnly topic={topic} value={extraContent} onChangeAction={setExtraContent} onSubmitAction={handleSubmit}/>

            <h2 className="text-white font-bold text-2xl mt-4"> Here are some resources</h2>
                <ul className="list-disc pl-6 mt-2">
                    <li>
                        <Link href="https://www.geeksforgeeks.org/dsa/linear-search/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                            Linear Search Algorithm
                        </Link>
                    </li>
                    <li>
                        <Link href="https://www.geeksforgeeks.org/dsa/binary-search/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                            Binary Search Algorithm
                        </Link>
                    </li>
                    <li>
                        <Link href="https://www.geeksforgeeks.org/quizzes/top-mcqs-on-searching-algorithm-with-answers/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                            Top MCQs on Searching Algorithm with Answers
                        </Link>
                    </li>
                </ul>
            <h2 className="font-bold text-xl mt-2">Searching Algorithms LeetCode Problems</h2>
                <ul className="list-disc pl-6 mt-2">
                    <li>
                        <Link href="https://leetcode.com/problem-list/binary-search/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                            Binary Search Problems
                        </Link>
                    </li>
                    <li>
                        <Link href="https://leetcode.com/problem-list/breadth-first-search/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                            Breadth-First Search
                        </Link>
                    </li>
                    <li>
                        <Link href="https://leetcode.com/problem-list/depth-first-search/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                            Depth-First Search
                        </Link>
                    </li>
                </ul>
        </>
      );

    case "Sorting Algorithms":
      return (
        <>
            <p>
            Sorting algorithms are used to arrange data in a particular order, such as ascending or descending. 
            They play a vital role in optimizing data processing, making searching and analysis more efficient. 
            Common sorting techniques include <strong>Bubble Sort</strong> (simple but inefficient), 
            <strong>QuickSort</strong> (efficient for large datasets with average-case time complexity of O(n log n)), 
            and <strong>MergeSort</strong> (a stable, divide-and-conquer algorithm). 
            Other algorithms like <strong>HeapSort</strong>, <strong>Insertion Sort</strong>, and <strong>Selection Sort</strong> 
            offer different trade-offs between complexity, memory usage, and stability. 
            Choosing the right sorting method depends on the context, such as data size, whether the data is already partially sorted, 
            or if stability is required (preserving the order of equal elements).
            </p>

            <AdminContributions content={additionalContent ?? []} />
            <AdminOnly topic={topic} value={extraContent} onChangeAction={setExtraContent} onSubmitAction={handleSubmit}/>

            <h2 className="text-white font-bold text-2xl mt-4"> Here are some resources</h2>
                <ul className="list-disc pl-6 mt-2">
                    <li>
                        <Link href="https://www.geeksforgeeks.org/introduction-to-sorting-algorithm/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                            Introduction to Sorting Techniques - Data Structure and Algorithm Tutorials
                        </Link>
                    </li>
                    <li>
                        <Link href="https://www.geeksforgeeks.org/applications-advantages-and-disadvantages-of-sorting-algorithm/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                            Applications, Advantages and Disadvantages of Sorting Algorithm
                        </Link>
                    </li>
                    <li>
                        <Link href="https://www.geeksforgeeks.org/quizzes/top-mcqs-on-sorting-algorithms-with-answers/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                            Top MCQs on Sorting Algorithms with Answers
                        </Link>
                    </li>
                </ul>
            <h2 className="text-white font-bold text-xl mt-4"> LeetCode Problems</h2>
                <ul className="list-disc pl-6 mt-2">
                    <li>
                        <Link href="https://leetcode.com/problem-list/sorting/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                            Sorting LeetCode Problems
                        </Link>
                    </li>
                </ul>
        </>
      );

    case "Hashing":
        return (
            <>
                <p>
                    Hashing is a process that converts input data of any size into a fixed-size string of characters, known as a hash value or digest. This transformation is performed using a hash function, which is designed to distribute data uniformly and minimize collisions — cases where different inputs produce the same output.
                </p>
                <br></br>
                <p>
                    Hashing is fundamental in many areas of computer science. It is widely used in data structures like hash tables for fast data lookup, in cryptography for data integrity and password storage, and in checksums for file verification. A good hash function should be fast to compute, produce uniformly distributed values, and be resistant to reverse engineering and collisions.
                </p>
                <br></br>
                <p>
                    Common hashing algorithms include MD5, SHA-1, and SHA-256. While MD5 and SHA-1 are now considered insecure for cryptographic purposes, SHA-256 remains widely used due to its balance between performance and security.
                </p>
                <br></br>

                <AdminContributions content={additionalContent ?? []} />
                <AdminOnly topic={topic} value={extraContent} onChangeAction={setExtraContent} onSubmitAction={handleSubmit}/>

                <h2 className="text-white font-bold text-2xl"> Here are some resources</h2>
                    <ul className="list-disc pl-6 mt-2">
                        <li>
                            <Link href="https://www.geeksforgeeks.org/dsa/hashing-data-structure/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Hashing in Data Structure
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/introduction-to-hashing-2/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Introduction to Hashing
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/quizzes/top-mcqs-on-hash-data-strcuture-with-answers/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Top MCQs on Hash Data Strcuture with Answers
                            </Link>
                        </li>
                    </ul>

                <h2 className="text-white font-bold text-xl mt-4"> LeetCode Problems</h2>
                    <ul className="list-disc pl-6 mt-2">
                        <li>
                            <Link href="https://leetcode.com/problem-list/hash-table/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Hashing LeetCode Problems
                            </Link>
                        </li>
                    </ul>
            </>
        );
    
    case "Two Pointer Technique":
        return (
            <>
                <p>
                The two-pointer technique is a powerful approach for solving array and linked list problems efficiently.
                It involves using two pointers (or indices) that traverse the data structure at different speeds or from different directions.
                This method is especially useful in problems involving searching, sorting, and optimization — such as finding pairs that sum to a target,
                reversing arrays in-place, or merging two sorted arrays. Common patterns include the **slow-fast pointer** for cycle detection and
                the **left-right pointer** for narrowing down ranges in sorted arrays. It reduces time and space complexity by avoiding unnecessary loops or extra memory.
                Mastering this technique is essential for competitive programming and technical interviews.
                </p>

                <AdminContributions content={additionalContent ?? []} />
                <AdminOnly topic={topic} value={extraContent} onChangeAction={setExtraContent} onSubmitAction={handleSubmit}/>

                <h2 className="text-white font-bold text-2xl mt-4"> Here are some resources</h2>
                    <ul className="list-disc pl-6 mt-2">
                        <li>
                            <Link href="https://www.geeksforgeeks.org/dsa/two-pointers-technique/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Two Pointers Technique
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/two-pointer-technique/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Quiz on Two Pointer Technique for DSA
                            </Link>
                        </li>
                    </ul>
                <h2 className="text-white font-bold text-xl mt-4"> LeetCode Problems</h2>
                    <ul className="list-disc pl-6 mt-2">
                        <li>
                            <Link href="https://leetcode.com/problem-list/two-pointers/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Two Pointer Technique LeetCode Problems
                            </Link>
                        </li>
                    </ul>
            </>
        );
    
    case "Window Sliding Technique":
        return (
            <>
                <p>
                The sliding window technique is an efficient method used to solve problems involving subarrays, substrings, or sequences
                that require tracking a range or window within the data. Instead of checking every possible subarray (which can be inefficient),
                this technique maintains a window that expands or contracts as needed, typically using two pointers.
                It is commonly used to solve problems like finding the maximum sum of a subarray of size <code>k</code>, the longest substring without repeating characters,
                or the minimum window containing all characters of a pattern. This technique significantly improves performance by reducing time complexity
                from O(n²) to O(n) in many scenarios.
                </p>

                <AdminContributions content={additionalContent ?? []} />
                <AdminOnly topic={topic} value={extraContent} onChangeAction={setExtraContent} onSubmitAction={handleSubmit}/>

                <h2 className="text-white font-bold text-2xl mt-4"> Here are some resources</h2>
                    <ul className="list-disc pl-6 mt-2">
                        <li>
                            <Link href="https://www.geeksforgeeks.org/window-sliding-technique/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Sliding Window Technique
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/quizzes/quiz-on-sliding-window-technique-for-dsa/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Quiz on Sliding window Technique for DSA
                            </Link>
                        </li>
                    </ul>
                <h2 className="text-white font-bold text-xl mt-4">LeetCode Problems</h2>
                    <ul className="list-disc pl-6 mt-2">
                        <li>
                            <Link href="https://leetcode.com/problem-list/sliding-window/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Window Sliding Technique LeetCode Problems
                            </Link>
                        </li>
                    </ul>
            </>
        );
    
    case "Prefix Sum Technique":
        return (
            <>
                <p>
                The prefix sum technique is a powerful method for efficiently calculating the sum of elements in a subarray or range of indices.
                It involves precomputing an array where each element at index <code>i</code> stores the cumulative sum of elements from the start up to <code>i</code>.
                Once the prefix sum array is built, the sum of any subarray can be obtained in constant time using the formula 
                <code>prefix[j] - prefix[i - 1]</code>. This technique is especially useful in problems with multiple range sum queries,
                or when needing to optimize brute-force approaches with nested loops. Variants like 2D prefix sums are also commonly used in matrix problems.
                </p>

                <AdminContributions content={additionalContent ?? []} />
                <AdminOnly topic={topic} value={extraContent} onChangeAction={setExtraContent} onSubmitAction={handleSubmit}/>

                <h2 className="text-white font-bold text-2xl mt-4"> Here are some resources</h2>
                    <ul className="list-disc pl-6 mt-2">
                        <li>
                            <Link href="https://www.geeksforgeeks.org/prefix-sum-array-implementation-applications-competitive-programming/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Prefix Sum Technique
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/quizzes/quiz-on-prefix-sum-for-dsa/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Quiz on Prefix Sum for DSA
                            </Link>
                        </li>
                    </ul>
                <h2 className="text-white font-bold text-xl mt-4">LeetCode Problems</h2>
                    <ul className="list-disc pl-6 mt-2">
                        <li>
                            <Link href="https://leetcode.com/problem-list/prefix-sum/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Prefix Sum Technique LeetCode Problems
                            </Link>
                        </li>
                    </ul>
            </>
        );

    case "String":
        return (
            <>
                <p>
                Strings are sequences of characters used to represent and manipulate text in programming. String problems are common in coding interviews 
                and can involve tasks such as pattern matching, substring search, frequency analysis, reversal, and transformation. Efficient handling of strings 
                often requires familiarity with techniques like the sliding window, two pointers, hashing, prefix/suffix arrays, and dynamic programming. 
                Additionally, knowledge of concepts like palindromes, anagrams, and regular expressions can be very useful. Since strings are immutable in many languages,
                understanding how to build and manipulate them efficiently is key to writing performant solutions.
                </p>

                <AdminContributions content={additionalContent ?? []} />
                <AdminOnly topic={topic} value={extraContent} onChangeAction={setExtraContent} onSubmitAction={handleSubmit}/>

                <h2 className="text-white font-bold text-2xl mt-4"> Here are some resources</h2>
                    <ul className="list-disc pl-6 mt-2">
                        <li>
                            <Link href="https://www.geeksforgeeks.org/dsa/string-data-structure/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                String in Data Structure
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/quizzes/quiz-on-string-for-dsa/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Quiz on String for DSA
                            </Link>
                        </li>
                    </ul>
                <h2 className="text-white font-bold text-xl mt-4">LeetCode Problems</h2>
                    <ul className="list-disc pl-6 mt-2">
                        <li>
                            <Link href="https://leetcode.com/problem-list/string/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                String Problems
                            </Link>
                        </li>
                    </ul>
            </>
        );
    
    case "Recursion":
        return (
            <>
                <p>
                Recursion is a fundamental programming technique where a function calls itself to solve smaller instances of a problem.
                It is particularly useful for problems that have a natural recursive structure, such as traversing trees, solving combinatorial problems,
                and implementing algorithms like divide and conquer. Each recursive call typically reduces the problem size, and the base case defines
                when the recursion should stop. While recursion can lead to elegant and concise solutions, it is important to manage stack depth
                and avoid excessive calls to prevent stack overflow. Optimizations like memoization (used in dynamic programming) or converting
                recursion to iteration using stacks can improve performance and avoid inefficiencies.
                </p>
                
                <AdminContributions content={additionalContent ?? []} />
                <AdminOnly topic={topic} value={extraContent} onChangeAction={setExtraContent} onSubmitAction={handleSubmit}/>

                <h2 className="text-white font-bold text-2xl mt-4"> Here are some resources</h2>
                    <ul className="list-disc pl-6 mt-2">
                        <li>
                            <Link href="https://www.geeksforgeeks.org/dsa/recursion-algorithms/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Recursive Algorithms
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/introduction-to-recursion-2/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Introduction to Recursion
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/dsa/difference-between-recursion-and-iteration/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Difference between Recursion and Iteration
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/finite-and-infinite-recursion-with-examples/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Finite and Infinite Recursion with examples
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/dsa/tail-recursion/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                What is Tail Recursion
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/why-is-tail-recursion-optimization-faster-than-normal-recursion/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Why is Tail Recursion optimization faster than normal Recursion?
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/quizzes/top-mcqs-on-recursion-algorithm-with-answers/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Top MCQs on Recursion Algorithm with Answers
                            </Link>
                        </li>
                    </ul>
                <h2 className="text-white font-bold text-xl mt-4">LeetCode Problems</h2>
                    <ul className="list-disc pl-6 mt-2">
                        <li>
                            <Link href="https://leetcode.com/problem-list/recursion/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Recursion LeetCode Problems
                            </Link>
                        </li>
                    </ul>
            </>
        );
    
    case "Matrix/Grid":
        return (
            <>
                <p>
                Matrices (or grids) are two-dimensional data structures that store data in rows and columns, and are widely used to represent images, maps, game boards, and more.
                Problems involving matrices often require traversal in multiple directions (up, down, left, right), and sometimes even diagonally or in-place modification.
                Common operations include searching, pathfinding, flood fill, and dynamic programming on grids. Mastering matrix traversal techniques such as DFS, BFS,
                and backtracking is crucial, especially for problems involving islands, connected components, or shortest paths.
                Optimizations like visited arrays or in-place marking are often used to reduce space complexity.
                </p>
                
                <AdminContributions content={additionalContent ?? []} />
                <AdminOnly topic={topic} value={extraContent} onChangeAction={setExtraContent} onSubmitAction={handleSubmit}/>

                <h2 className="text-white font-bold text-2xl mt-4"> Here are some resources</h2>
                    <ul className="list-disc pl-6 mt-2">
                        <li>
                            <Link href="https://www.geeksforgeeks.org/dsa/matrix/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Matrix Data Structure
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/dsa/introduction-to-matrix-or-grid-data-structure-and-algorithms-tutorial/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Matrix or Grid or 2D Array
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/dsa/row-wise-vs-column-wise-traversal-matrix/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Row-wise vs column-wise traversal of matrix
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/quizzes/quiz-on-matrixgrid-for-dsa/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Quiz on Matrix/Grid for DSA
                            </Link>
                        </li>
                    </ul>
                <h2 className="text-white font-bold text-xl mt-4">LeetCode Problems</h2>
                    <ul className="list-disc pl-6 mt-2">
                        <li>
                            <Link href="https://leetcode.com/problem-list/matrix/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Matrix LeetCode Problems
                            </Link>
                        </li>
                    </ul>
            </>
        );
    
    case "Linked List":
        return (
            <>
                <p>
                A linked list is a linear data structure made up of nodes, where each node contains a value and a pointer (or reference) to the next node in the sequence.
                Unlike arrays, linked lists do not require contiguous memory allocation, which makes insertion and deletion operations more efficient—especially in the middle of the list.
                There are various types of linked lists, including singly linked lists, doubly linked lists (with references to both next and previous nodes), and circular linked lists.
                Linked lists are commonly used to implement stacks, queues, and adjacency lists for graphs. Common interview problems involve detecting cycles (using slow and fast pointers),
                reversing a list, merging sorted lists, and removing the nth node from the end. Understanding pointer manipulation and edge cases (like handling null references) is key to mastering this topic.
                </p>

                <AdminContributions content={additionalContent ?? []} />
                <AdminOnly topic={topic} value={extraContent} onChangeAction={setExtraContent} onSubmitAction={handleSubmit}/>

                <h2 className="text-white font-bold text-2xl mt-4"> Here are some resources</h2>
                    <ul className="list-disc pl-6 mt-2">
                        <li>
                            <Link href="https://www.geeksforgeeks.org/dsa/linked-list-data-structure/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Linked List Data Structure
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/singly-linked-list-tutorial/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Singly Linked List
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/doubly-linked-list/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Doubly Linked List
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/dsa/circular-linked-list/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Introduction to Circular Linked List
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/quizzes/top-mcqs-on-linked-list-data-structure-with-answers/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Top MCQs on Linked List Data Structure with Answers
                            </Link>
                        </li>
                    </ul>
                <h2 className="text-white font-bold text-xl mt-4">LeetCode Problems</h2>
                    <ul className="list-disc pl-6 mt-2">
                        <li>
                            <Link href="https://leetcode.com/problem-list/linked-list/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Linked List LeetCode Problems
                            </Link>
                        </li>
                        <li>
                            <Link href="https://leetcode.com/problem-list/doubly-linked-list/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Double Linked List LeetCode Problems
                            </Link>
                        </li>
                    </ul>
            </>
        );

    case "Stack":
        return (
            <>
                <p>
                A stack is a linear data structure that follows the LIFO (Last In, First Out) principle, meaning the last element added is the first one to be removed.
                It is commonly used in scenarios like undo operations, expression evaluation, parsing, and managing function calls via the call stack.
                Operations on a stack include <code>push</code> (add an element), <code>pop</code> (remove the top element), and <code>peek</code> or <code>top</code> (view the top element).
                Stacks can be implemented using arrays or linked lists and are often used in combination with other techniques like DFS or balanced parentheses validation.
                Mastering stacks is crucial for solving problems related to backtracking, recursion simulation, and maintaining history of operations.
                </p>

                <AdminContributions content={additionalContent ?? []} />
                <AdminOnly topic={topic} value={extraContent} onChangeAction={setExtraContent} onSubmitAction={handleSubmit}/>

                <h2 className="text-white font-bold text-2xl mt-4"> Here are some resources</h2>
                    <ul className="list-disc pl-6 mt-2">
                        <li>
                            <Link href="https://www.geeksforgeeks.org/dsa/stack-data-structure/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Stack Data Structure
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/dsa/introduction-to-stack-data-structure-and-algorithm-tutorials/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                What is Stack Data Structure? 
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/dsa/implement-stack-using-array/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Implement Stack using Array
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/dsa/implement-a-stack-using-singly-linked-list/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Implement a stack using singly linked list
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/dsa/stack-implementation-using-deque/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Stack Implementation using Deque
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/quizzes/top-mcqs-on-stack-data-strcuture-with-answers/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Top MCQs on Stack Data Structure with Answers
                            </Link>
                        </li>
                    </ul>
                <h2 className="text-white font-bold text-xl mt-4">LeetCode Problems</h2>
                    <ul className="list-disc pl-6 mt-2">
                        <li>
                            <Link href="https://leetcode.com/problem-list/stack/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Stack LeetCode Problems
                            </Link>
                        </li>
                        <li>
                            <Link href="https://leetcode.com/problem-list/monotonic-stack/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Monotic Stack LeetCode Problems
                            </Link>
                        </li>
                    </ul>
            </>
        );
    
    case "Queue":
        return (
            <>
                <p>
                A queue is a linear data structure that follows the FIFO (First In, First Out) principle, where elements are added at the back (enqueue) and removed from the front (dequeue).
                Queues are widely used in scenarios like scheduling tasks, managing requests in servers, breadth-first search (BFS) in graphs, and buffering data streams.
                Variants include circular queues, priority queues (where elements are dequeued based on priority), and double-ended queues (deques) which allow insertion and removal from both ends.
                Understanding queues is essential for designing efficient algorithms that require order preservation and fair processing.
                </p>

                <AdminContributions content={additionalContent ?? []} />
                <AdminOnly topic={topic} value={extraContent} onChangeAction={setExtraContent} onSubmitAction={handleSubmit}/>

                <h2 className="text-white font-bold text-2xl mt-4"> Here are some resources</h2>
                    <ul className="list-disc pl-6 mt-2">
                        <li>
                            <Link href="https://www.geeksforgeeks.org/dsa/queue-data-structure/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Queue Data Structure
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/dsa/introduction-to-queue-data-structure-and-algorithm-tutorials/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Introduction to Queue Data Structure
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/dsa/basic-operations-for-queue-in-data-structure/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Basic Operations for Queue in Data Structure
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/dsa/introduction-and-array-implementation-of-queue/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Introduction and Array Implementation of Queue
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/dsa/queue-linked-list-implementation/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Queue - Linked List Implementation
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/dsa/queue-linked-list-implementation/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Queue - Linked List Implementation
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/quizzes/top-mcqs-on-queue-data-structure-with-answers/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Top MCQs on Queue Data Structure with Answers
                            </Link>
                        </li>
                    </ul>
                <h2 className="text-white font-bold text-xl mt-4">LeetCode Problems</h2>
                    <ul className="list-disc pl-6 mt-2">
                        <li>
                            <Link href="https://leetcode.com/problem-list/queue/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Queue LeetCode Problems
                            </Link>
                        </li>
                        <li>
                            <Link href="https://leetcode.com/problem-list/monotonic-queue/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Monotic Queue LeetCode Problems
                            </Link>
                        </li>
                    </ul>
            </>
        );
    
    case "Deque":
        return (
            <>
                <p>
                A deque (double-ended queue) is a versatile data structure that allows insertions and deletions at both the front and back ends.
                It combines the properties of stacks and queues, supporting operations like push_front, push_back, pop_front, and pop_back efficiently.
                Deques are useful in scenarios such as implementing sliding window algorithms, maintaining candidates for maximum or minimum values,
                and buffering data where flexible access from both ends is needed.
                They can be implemented using arrays or linked lists, and are often optimized for O(1) time complexity on both ends.
                </p>

                <AdminContributions content={additionalContent ?? []} />
                <AdminOnly topic={topic} value={extraContent} onChangeAction={setExtraContent} onSubmitAction={handleSubmit}/>

                 <h2 className="text-white font-bold text-2xl mt-4"> Here are some resources</h2>
                    <ul className="list-disc pl-6 mt-2">
                        <li>
                            <Link href="https://www.geeksforgeeks.org/dsa/deque-set-1-introduction-applications/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Deque - Introduction and Applications
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/quizzes/deque-960/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Quiz Deque
                            </Link>
                        </li>
                    </ul>
            </>
        );
    
    case "Tree":
        return (
            <>
                <p>
                A tree is a hierarchical data structure consisting of nodes connected by edges, with a single root node and various levels of child nodes.
                It models relationships where each node can have multiple children but only one parent, except for the root which has none.
                Trees are widely used in computer science for organizing data, such as in file systems, databases (B-trees), and expression parsing.
                Key concepts include traversal methods (preorder, inorder, postorder, level-order), tree height and depth, and special types like binary trees, binary search trees, AVL trees, and tries.
                Efficient tree algorithms rely on recursion and understanding node relationships.
                </p>

                <AdminContributions content={additionalContent ?? []} />
                <AdminOnly topic={topic} value={extraContent} onChangeAction={setExtraContent} onSubmitAction={handleSubmit}/>

                <h2 className="text-white font-bold text-2xl mt-4"> Here are some resources</h2>
                    <ul className="list-disc pl-6 mt-2">
                        <li>
                            <Link href="https://www.geeksforgeeks.org/dsa/tree-data-structure/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Tree Data Structure
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/introduction-to-tree-data-structure/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Introduction to Tree Data Structure
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/types-of-trees-in-data-structures/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Types of Trees in Data Structures
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/quizzes/tree-22648/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Quiz On Tree Data Structure
                            </Link>
                        </li>
                    </ul>
                <h2 className="text-white font-bold text-xl mt-4">LeetCode Problems</h2>
                    <ul className="list-disc pl-6 mt-2">
                        <li>
                            <Link href="https://leetcode.com/problem-list/tree/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Tree LeetCode Problems
                            </Link>
                        </li>
                        <li>
                            <Link href="https://leetcode.com/problem-list/binary-tree/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Binary Tree LeetCode Problems
                            </Link>
                        </li>
                        <li>
                            <Link href="https://leetcode.com/problem-list/segment-tree/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Segment Tree LeetCode Problems
                            </Link>
                        </li>
                        <li>
                            <Link href="https://leetcode.com/problem-list/binary-indexed-tree/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Binary Indexed Tree LeetCode Problems
                            </Link>
                        </li>
                        <li>
                            <Link href="https://leetcode.com/problem-list/minimum-spanning-tree/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Minimum Spanning Tree LeetCode Problems
                            </Link>
                        </li>
                        <li>
                            <Link href="https://leetcode.com/problem-list/binary-search-tree/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Binary Search Tree
                            </Link>
                        </li>
                    </ul>
            </>
        );
    
    case "Heap":
        return (
            <>
                <p>
                A heap is a specialized tree-based data structure that satisfies the heap property: in a max-heap, each parent node´s value is greater than or equal to its children´s values; in a min-heap, it is less than or equal to them.
                Heaps are commonly implemented as binary heaps using arrays for efficient indexing.
                They are widely used in priority queues, heap sort algorithms, and for efficiently finding the k-largest or k-smallest elements in a dataset.
                Operations such as insertion, deletion, and heapify typically run in O(log n) time, making heaps very efficient for dynamic ordering.
                </p>

                <AdminContributions content={additionalContent ?? []} />
                <AdminOnly topic={topic} value={extraContent} onChangeAction={setExtraContent} onSubmitAction={handleSubmit}/>

                <h2 className="text-white font-bold text-2xl mt-4"> Here are some resources</h2>
                    <ul className="list-disc pl-6 mt-2">
                        <li>
                            <Link href="https://www.geeksforgeeks.org/dsa/heap-data-structure/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Heap Data Structure
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/dsa/binary-heap/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Binary Heap
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/quizzes/top-mcqs-on-heap-data-strcuture-with-answers/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Top MCQs on Heap Data Strcuture with Answers
                            </Link>
                        </li>
                    </ul>
                <h2 className="text-white font-bold text-xl mt-4">LeetCode Problems</h2>
                    <ul className="list-disc pl-6 mt-2">
                        <li>
                            <Link href="https://leetcode.com/problem-list/heap-priority-queue/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Heap LeetCode Problems
                            </Link>
                        </li>
                    </ul>
            </>
        );

    case "Graph":
        return (
            <>
                <p>
                A graph is a versatile data structure consisting of a set of nodes (vertices) connected by edges, which can be either directed or undirected.
                Graphs are used to model relationships and networks such as social connections, communication systems, transportation routes, and dependencies.
                Common representations include adjacency lists and adjacency matrices.
                Key algorithms on graphs include traversal methods like Depth-First Search (DFS) and Breadth-First Search (BFS), shortest path algorithms (Dijkstra, Bellman-Ford), 
                cycle detection, topological sorting, and minimum spanning trees (Kruskal, Prim).
                Understanding graph theory and algorithms is essential for solving complex problems in computer science and real-world applications.
                </p>

                <AdminContributions content={additionalContent ?? []} />
                <AdminOnly topic={topic} value={extraContent} onChangeAction={setExtraContent} onSubmitAction={handleSubmit}/>

                <h2 className="text-white font-bold text-2xl mt-4"> Here are some resources</h2>
                    <ul className="list-disc pl-6 mt-2">
                        <li>
                            <Link href="https://www.geeksforgeeks.org/dsa/graph-data-structure-and-algorithms/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Graph Algorithms
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/dsa/graph-and-its-representations/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Graph and its representations
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/quizzes/graph-12715/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Quiz On Graph Data Structure
                            </Link>
                        </li>
                    </ul>
                <h2 className="text-white font-bold text-xl mt-4">LeetCode Problems</h2>
                    <ul className="list-disc pl-6 mt-2">
                        <li>
                            <Link href="https://leetcode.com/problem-list/graph/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Graph LeetCode Problems
                            </Link>
                        </li>
                    </ul>
            </>
        );
    
    case "Greedy Algorithm":
        return (
            <>
                <p>
                Greedy algorithms make the locally optimal choice at each step with the hope of finding a global optimum solution.
                They are widely used in optimization problems such as scheduling, resource allocation, and pathfinding.
                Examples include algorithms like Activity Selection, Huffman Coding, and Prim´s and Kruskal´s algorithms for Minimum Spanning Trees.
                While greedy methods are often efficient and simple to implement, they do not always guarantee the optimal solution for every problem,
                so it´s important to understand the problem´s structure before applying a greedy approach.
                </p>

                <AdminContributions content={additionalContent ?? []} />
                <AdminOnly topic={topic} value={extraContent} onChangeAction={setExtraContent} onSubmitAction={handleSubmit}/>

                <h2 className="text-white font-bold text-2xl mt-4"> Here are some resources</h2>
                    <ul className="list-disc pl-6 mt-2">
                        <li>
                            <Link href="https://www.geeksforgeeks.org/dsa/greedy-algorithms/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Greedy Algorithms
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/introduction-to-greedy-algorithm-data-structures-and-algorithm-tutorials/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Greedy Algorithm Tutorial
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/greedy-algorithms-general-structure-and-applications/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Greedy Algorithms General Structure
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/quizzes/top-mcqs-on-greedy-algorithms-with-answers/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Top MCQs on Greedy Algorithms with Answers
                            </Link>
                        </li>
                    </ul>
                <h2 className="text-white font-bold text-xl mt-4">LeetCode Problems</h2>
                    <ul className="list-disc pl-6 mt-2">
                        <li>
                            <Link href="https://leetcode.com/tag/greedy" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Greedy Algorithm LeetCode Problems
                            </Link>
                        </li>
                    </ul>
            </>
        );
    
    case "Dynamic Programming":
        return (
            <>
                <p>
                Dynamic programming is a powerful technique for solving complex problems by breaking them down into overlapping subproblems, solving each subproblem just once, and storing their solutions (memoization or tabulation) to avoid redundant computations.
                It is widely used for optimization problems, such as shortest paths, sequence alignment, and combinatorial counting.
                The key to dynamic programming is identifying the problem’s optimal substructure and overlapping subproblems.
                Mastering this technique involves understanding how to formulate recursive relations and convert them into efficient iterative solutions.
                </p>    

                <AdminContributions content={additionalContent ?? []} />
                <AdminOnly topic={topic} value={extraContent} onChangeAction={setExtraContent} onSubmitAction={handleSubmit}/>

                <h2 className="text-white font-bold text-2xl mt-4"> Here are some resources</h2>
                    <ul className="list-disc pl-6 mt-2">
                        <li>
                            <Link href="https://www.geeksforgeeks.org/dynamic-programming/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Dynamic Programming or DP
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/dsa/introduction-to-dynamic-programming-data-structures-and-algorithm-tutorials/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Dynamic Programming (DP) Introduction
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/dsa/tabulation-vs-memoization/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Tabulation vs Memoization
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/dsa/solve-dynamic-programming-problem/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Steps to solve a Dynamic Programming Problem
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.geeksforgeeks.org/quizzes/top-mcqs-on-dynamic-programming-with-answers/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Top MCQs on Dynamic Programming with Answers
                            </Link>
                        </li>
                    </ul>
                <h2 className="text-white font-bold text-xl mt-4">LeetCode Problems</h2>
                    <ul className="list-disc pl-6 mt-2">
                        <li>
                            <Link href="https://leetcode.com/problem-list/dynamic-programming/" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Dynamic Programming LeetCode Problems
                            </Link>
                        </li>
                    </ul>
            </>
        );
    
    case "Mocks Interviews":
        return (
            <>
                <p>
                    Preparation for technical interviews with mock questions and answers.
                </p>
                
                <AdminContributions content={additionalContent ?? []} />
                <AdminOnly topic={topic} value={extraContent} onChangeAction={setExtraContent} onSubmitAction={handleSubmit}/>

                <h2 className="text-white font-bold text-2xl mt-4"> Here are some resources</h2>
                    <ul className="list-disc pl-6 mt-2">
                        <li>
                            <Link href="" target="_blank" className="text-green-500 hover:underline hover:scale-105 duration-300">
                                Mocks Interviews
                            </Link>
                        </li>
                    </ul>

            </>
        );
    
    default:
    return (
        <>
        <h2 className="text-xl font-semibold mb-2">{topic}</h2>
        <p className="mb-4">Content for this topic is not yet customized.</p>

        <AdminContributions content={additionalContent ?? []} />
        </>
    );
  }
};

export default ResourceContent;
