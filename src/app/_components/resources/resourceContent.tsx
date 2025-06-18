import Link from "next/link";
import { useState } from "react";

const ResourceContent = ({ topic, userRole }: { topic: string; userRole: "admin" | "user" }) => {

    const isAdmin = userRole === "admin";
    const [extraContent, setExtraContent] = useState("");
    const [submittedContent, setSubmittedContent] = useState<string | null>(null);

    const handleSubmit = () => {
        if (extraContent.trim()) {
        setSubmittedContent(extraContent);
        setExtraContent("");
        // Aquí podrías hacer una petición a tu base de datos para guardar (ej. fetch/axios)
        }
    };
  switch (topic) {
    case "Resources Page":
      return (
        <>
            <h2 className="text-2xl font-semibold mb-2"> Welcome </h2>
                <p>
                    This section provides an overview of algorithms, their importance, and the foundational concepts in algorithm design and analysis.
                </p>
                <p>
                    Any request for a specific topic please refer to Hector
                </p>
        </>
      );
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
            Big O notation describes the upper bound of time or space complexity as input size grows. It's written as O(f(n)).
          </p>

          {isAdmin && (
            <div className="mt-8 bg-gray-900 p-4 rounded border border-yellow-400">
              <h3 className="text-lg font-bold text-yellow-400 mb-2">Add Information (Admin)</h3>
              <textarea
                className="w-full p-2 rounded text-black"
                rows={4}
                placeholder="Write additional content here..."
                value={extraContent}
                onChange={(e) => setExtraContent(e.target.value)}
              />
              <button
                onClick={handleSubmit}
                className="mt-2 px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400"
              >
                Submit
              </button>
            </div>
          )}
          {submittedContent && (
            <div className="mt-6 p-4 bg-gray-800 rounded">
              <h4 className="text-md font-semibold text-green-400 mb-1">Writer</h4>
              <p>{submittedContent}</p>
            </div>
          )}
        </>
      );

    case "Arrays":
        return (
            <>
                <p>
                    An array is a data structure that stores elements in contiguous memory locations, allowing efficient access by index. Arrays have a fixed size and can store elements of the same type.
                </p>

                <h2 className="text-white font-bold text-2xl mt-4"> Here are some resources</h2>
                <ul className="list-disc pl-6 mt-2">
                    <li>
                        <Link href="https://www.geeksforgeeks.org/introduction-to-arrays-data-structure-and-algorithm-tutorials/" target="_blank" className="text-green-500 hover:underline">
                            Getting Started with Array Data Structure
                        </Link>
                    </li>
                    <li>
                        <Link href="https://www.geeksforgeeks.org/dsa/array-data-structure-guide/" target="_blank" className="text-green-500 hover:underline">
                            Array Data Structure Guide
                        </Link>
                    </li>
                    <li>
                        <Link href="hhttps://www.w3schools.com/dsa/dsa_data_arrays.php" target="_blank" className="text-green-500 hover:underline">
                            DSA Arrays
                        </Link>
                    </li>
                </ul>
                {isAdmin && (
                    <div className="mt-8 bg-gray-900 p-4 rounded border border-yellow-400">
                    <h3 className="text-lg font-bold text-yellow-400 mb-2">Add Information (Admin)</h3>
                    <textarea
                        className="w-full p-2 rounded text-black"
                        rows={4}
                        placeholder="Write additional content here..."
                        value={extraContent}
                        onChange={(e) => setExtraContent(e.target.value)}
                    />
                    <button
                        onClick={handleSubmit}
                        className="mt-2 px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400"
                    >
                        Submit
                    </button>
                    </div>
                )}
                {submittedContent && (
                    <div className="mt-6 p-4 bg-gray-800 rounded">
                    <h4 className="text-md font-semibold text-green-400 mb-1">Writer</h4>
                    <p>{submittedContent}</p>
                    </div>
                )}
                </>
        );

    case "Searching Algorithms":
      return (
        <>
            <p>
                Includes linear search, binary search, etc.
            </p>
            <h2 className="text-white font-bold text-2xl mt-4"> Here are some resources</h2>
            <ul className="list-disc pl-6 mt-2">
                <li>
                    <Link href="https://www.geeksforgeeks.org/dsa/linear-search/" target="_blank" className="text-green-500 hover:underline">
                        Linear Search Algorithm
                    </Link>
                </li>
                <li>
                    <Link href="https://www.geeksforgeeks.org/dsa/binary-search/" target="_blank" className="text-green-500 hover:underline">
                        Binary Search Algorithm
                    </Link>
                </li>
                <li>
                    <Link href="https://www.programiz.com/dsa/searching-algorithms" target="_blank" className="text-green-500 hover:underline">
                        Programiz Searching Algorithms
                    </Link>
                </li>
            </ul>
            <h2 className="font-bold text-xl">Searching Algorithms LeetCode Probelms</h2>
            <ul className="list-disc pl-6 mt-2">
                <li>
                    <Link href="https://leetcode.com/problem-list/binary-search/" target="_blank" className="text-green-500 hover:underline">
                        Binary Search Problems
                    </Link>
                </li>
                <li>
                    <Link href="https://leetcode.com/problem-list/breadth-first-search/" target="_blank" className="text-green-500 hover:underline">
                        Breadth-First Search
                    </Link>
                </li>
                <li>
                    <Link href="https://leetcode.com/problem-list/depth-first-search/" target="_blank" className="text-green-500 hover:underline">
                        Depth-First Search
                    </Link>
                </li>
            </ul>

            {isAdmin && (
                <div className="mt-8 bg-gray-900 p-4 rounded border border-yellow-400">
                <h3 className="text-lg font-bold text-yellow-400 mb-2">Add Information (Admin)</h3>
                <textarea
                    className="w-full p-2 rounded text-black"
                    rows={4}
                    placeholder="Write additional content here..."
                    value={extraContent}
                    onChange={(e) => setExtraContent(e.target.value)}
                />
                <button
                    onClick={handleSubmit}
                    className="mt-2 px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400"
                >
                    Submit
                </button>
                </div>
            )}
            {submittedContent && (
                <div className="mt-6 p-4 bg-gray-800 rounded">
                <h4 className="text-md font-semibold text-green-400 mb-1">Writer</h4>
                <p>{submittedContent}</p>
                </div>
            )}
        </>
      );

    case "Sorting Algorithms":
      return (
        <>
            <p>
                QuickSort, MergeSort, BubbleSort, etc.
            </p>

            <Link href="https://leetcode.com/problem-list/sorting/" target="_blank" className="text-green-500 hover:underline">
                Sorting LeetCode Problems
            </Link>

            {isAdmin && (
                <div className="mt-8 bg-gray-900 p-4 rounded border border-yellow-400">
                <h3 className="text-lg font-bold text-yellow-400 mb-2">Add Information (Admin)</h3>
                <textarea
                    className="w-full p-2 rounded text-black"
                    rows={4}
                    placeholder="Write additional content here..."
                    value={extraContent}
                    onChange={(e) => setExtraContent(e.target.value)}
                />
                <button
                    onClick={handleSubmit}
                    className="mt-2 px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400"
                >
                    Submit
                </button>
                </div>
            )}
            {submittedContent && (
                <div className="mt-6 p-4 bg-gray-800 rounded">
                <h4 className="text-md font-semibold text-green-400 mb-1">Writer</h4>
                <p>{submittedContent}</p>
                </div>
            )}
        </>
      );

    case "Hashing":
        return (
            <>
                <p>
                    Hashing is a technique used to map data of arbitrary size to fixed-size values, often used in hash tables for efficient data retrieval.
                </p>

                <Link href="https://leetcode.com/problem-list/hash-table/" target="_blank" className="text-green-500 hover:underline">
                    Hashing LeetCode Problems
                </Link>

                {isAdmin && (
                    <div className="mt-8 bg-gray-900 p-4 rounded border border-yellow-400">
                    <h3 className="text-lg font-bold text-yellow-400 mb-2">Add Information (Admin)</h3>
                    <textarea
                        className="w-full p-2 rounded text-black"
                        rows={4}
                        placeholder="Write additional content here..."
                        value={extraContent}
                        onChange={(e) => setExtraContent(e.target.value)}
                    />
                    <button
                        onClick={handleSubmit}
                        className="mt-2 px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400"
                    >
                        Submit
                    </button>
                    </div>
                )}
                {submittedContent && (
                    <div className="mt-6 p-4 bg-gray-800 rounded">
                    <h4 className="text-md font-semibold text-green-400 mb-1">Writer</h4>
                    <p>{submittedContent}</p>
                    </div>
                )}
            </>
        );
    
    case "Two Pointer Technique":
        return (
            <>
                <p>
                    The two-pointer technique is a common approach for solving problems involving arrays or linked lists.
                </p>
                <Link href="https://leetcode.com/problem-list/two-pointers/" target="_blank" className="text-green-500 hover:underline">
                    Two Pointer Technique LeetCode Problems
                </Link>

                {isAdmin && (
                    <div className="mt-8 bg-gray-900 p-4 rounded border border-yellow-400">
                    <h3 className="text-lg font-bold text-yellow-400 mb-2">Add Information (Admin)</h3>
                    <textarea
                        className="w-full p-2 rounded text-black"
                        rows={4}
                        placeholder="Write additional content here..."
                        value={extraContent}
                        onChange={(e) => setExtraContent(e.target.value)}
                    />
                    <button
                        onClick={handleSubmit}
                        className="mt-2 px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400"
                    >
                        Submit
                    </button>
                    </div>
                )}
                {submittedContent && (
                    <div className="mt-6 p-4 bg-gray-800 rounded">
                    <h4 className="text-md font-semibold text-green-400 mb-1">Writer</h4>
                    <p>{submittedContent}</p>
                    </div>
                )}
            </>
        );
    
    case "Window Sliding Technique":
        return (
            <>
                <p>
                    The sliding window technique is an approach for solving problems involving subarrays or subsequences.
                </p>
                <Link href="https://leetcode.com/problem-list/sliding-window/" target="_blank" className="text-green-500 hover:underline">
                    Window Sliding Technique LeetCode Problems
                </Link>

                {isAdmin && (
                    <div className="mt-8 bg-gray-900 p-4 rounded border border-yellow-400">
                    <h3 className="text-lg font-bold text-yellow-400 mb-2">Add Information (Admin)</h3>
                    <textarea
                        className="w-full p-2 rounded text-black"
                        rows={4}
                        placeholder="Write additional content here..."
                        value={extraContent}
                        onChange={(e) => setExtraContent(e.target.value)}
                    />
                    <button
                        onClick={handleSubmit}
                        className="mt-2 px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400"
                    >
                        Submit
                    </button>
                    </div>
                )}
                {submittedContent && (
                    <div className="mt-6 p-4 bg-gray-800 rounded">
                    <h4 className="text-md font-semibold text-green-400 mb-1">Writer</h4>
                    <p>{submittedContent}</p>
                    </div>
                )}
            </>
        );
    
    case "Prefix Sum Technique":
        return (
            <>
                <p>
                    The prefix sum technique is an approach to efficiently calculate the sums of subarrays.
                </p>
                <Link href="https://leetcode.com/problem-list/prefix-sum/" target="_blank" className="text-green-500 hover:underline">
                    Prefix Sum Technique LeetCode Problems
                </Link>

                {isAdmin && (
                    <div className="mt-8 bg-gray-900 p-4 rounded border border-yellow-400">
                    <h3 className="text-lg font-bold text-yellow-400 mb-2">Add Information (Admin)</h3>
                    <textarea
                        className="w-full p-2 rounded text-black"
                        rows={4}
                        placeholder="Write additional content here..."
                        value={extraContent}
                        onChange={(e) => setExtraContent(e.target.value)}
                    />
                    <button
                        onClick={handleSubmit}
                        className="mt-2 px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400"
                    >
                        Submit
                    </button>
                    </div>
                )}
                {submittedContent && (
                    <div className="mt-6 p-4 bg-gray-800 rounded">
                    <h4 className="text-md font-semibold text-green-400 mb-1">Writer</h4>
                    <p>{submittedContent}</p>
                    </div>
                )}
            </>
        );

    case "String":
        return (
            <>
                <p>
                    Strings are sequences of characters used to represent text.
                </p>
                <Link href="https://leetcode.com/problem-list/string/" target="_blank" className="text-green-500 hover:underline">
                    String Problems
                </Link>
                {isAdmin && (
                    <div className="mt-8 bg-gray-900 p-4 rounded border border-yellow-400">
                    <h3 className="text-lg font-bold text-yellow-400 mb-2">Add Information (Admin)</h3>
                    <textarea
                        className="w-full p-2 rounded text-black"
                        rows={4}
                        placeholder="Write additional content here..."
                        value={extraContent}
                        onChange={(e) => setExtraContent(e.target.value)}
                    />
                    <button
                        onClick={handleSubmit}
                        className="mt-2 px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400"
                    >
                        Submit
                    </button>
                    </div>
                )}
                {submittedContent && (
                    <div className="mt-6 p-4 bg-gray-800 rounded">
                    <h4 className="text-md font-semibold text-green-400 mb-1">Writer</h4>
                    <p>{submittedContent}</p>
                    </div>
                )}
            </>
        );
    
    case "Recursion":
        return (
            <>
                <p>
                    Recursion is a technique where a function calls itself to solve a problem.
                </p>
                <Link href="https://leetcode.com/problem-list/recursion/" target="_blank" className="text-green-500 hover:underline">
                    Recursion LeetCode Problems
                </Link>
                {isAdmin && (
                    <div className="mt-8 bg-gray-900 p-4 rounded border border-yellow-400">
                    <h3 className="text-lg font-bold text-yellow-400 mb-2">Add Information (Admin)</h3>
                    <textarea
                        className="w-full p-2 rounded text-black"
                        rows={4}
                        placeholder="Write additional content here..."
                        value={extraContent}
                        onChange={(e) => setExtraContent(e.target.value)}
                    />
                    <button
                        onClick={handleSubmit}
                        className="mt-2 px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400"
                    >
                        Submit
                    </button>
                    </div>
                )}
                {submittedContent && (
                    <div className="mt-6 p-4 bg-gray-800 rounded">
                    <h4 className="text-md font-semibold text-green-400 mb-1">Writer</h4>
                    <p>{submittedContent}</p>
                    </div>
                )}
            </>
        );
    
    case "Matrix/Grid":
        return (
            <>
                <p>
                    Matrices (or grids) are two-dimensional data structures that store data in rows and columns.
                </p>
                <Link href="https://leetcode.com/problem-list/matrix/" target="_blank" className="text-green-500 hover:underline">
                    Matrix LeetCode Problems
                </Link>

                {isAdmin && (
                    <div className="mt-8 bg-gray-900 p-4 rounded border border-yellow-400">
                    <h3 className="text-lg font-bold text-yellow-400 mb-2">Add Information (Admin)</h3>
                    <textarea
                        className="w-full p-2 rounded text-black"
                        rows={4}
                        placeholder="Write additional content here..."
                        value={extraContent}
                        onChange={(e) => setExtraContent(e.target.value)}
                    />
                    <button
                        onClick={handleSubmit}
                        className="mt-2 px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400"
                    >
                        Submit
                    </button>
                    </div>
                )}
                {submittedContent && (
                    <div className="mt-6 p-4 bg-gray-800 rounded">
                    <h4 className="text-md font-semibold text-green-400 mb-1">Writer</h4>
                    <p>{submittedContent}</p>
                    </div>
                )}
            </>
        );
    
    case "Linked List":
        return (
            <>
                <p>
                    A linked list is a data structure consisting of nodes, where each node contains a value and a reference to the next node.
                </p>
                <ul className="list-disc pl-6 mt-2">
                    <li>
                        <Link href="https://leetcode.com/problem-list/linked-list/" target="_blank" className="text-green-500 hover:underline">
                            Linked List LeetCode Problems
                        </Link>
                    </li>
                    <li>
                        <Link href="https://leetcode.com/problem-list/doubly-linked-list/" target="_blank" className="text-green-500 hover:underline">
                            Double Linked List LeetCode Problems
                        </Link>
                    </li>
                </ul>

                {isAdmin && (
                    <div className="mt-8 bg-gray-900 p-4 rounded border border-yellow-400">
                    <h3 className="text-lg font-bold text-yellow-400 mb-2">Add Information (Admin)</h3>
                    <textarea
                        className="w-full p-2 rounded text-black"
                        rows={4}
                        placeholder="Write additional content here..."
                        value={extraContent}
                        onChange={(e) => setExtraContent(e.target.value)}
                    />
                    <button
                        onClick={handleSubmit}
                        className="mt-2 px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400"
                    >
                        Submit
                    </button>
                    </div>
                )}
                {submittedContent && (
                    <div className="mt-6 p-4 bg-gray-800 rounded">
                    <h4 className="text-md font-semibold text-green-400 mb-1">Writer</h4>
                    <p>{submittedContent}</p>
                    </div>
                )}
            </>
        );

    case "Stack":
        return (
            <>
                <p>
                    A stack is a data structure that follows the LIFO (Last In, First Out) principle.
                </p>
                <ul className="list-disc pl-6 mt-2">
                    <li>
                        <Link href="https://leetcode.com/problem-list/stack/" target="_blank" className="text-green-500 hover:underline">
                            Stack LeetCode Problems
                        </Link>
                    </li>
                    <li>
                        <Link href="https://leetcode.com/problem-list/monotonic-stack/" target="_blank" className="text-green-500 hover:underline">
                            Monotic Stack LeetCode Problems
                        </Link>
                    </li>
                </ul>

                {isAdmin && (
                    <div className="mt-8 bg-gray-900 p-4 rounded border border-yellow-400">
                    <h3 className="text-lg font-bold text-yellow-400 mb-2">Add Information (Admin)</h3>
                    <textarea
                        className="w-full p-2 rounded text-black"
                        rows={4}
                        placeholder="Write additional content here..."
                        value={extraContent}
                        onChange={(e) => setExtraContent(e.target.value)}
                    />
                    <button
                        onClick={handleSubmit}
                        className="mt-2 px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400"
                    >
                        Submit
                    </button>
                    </div>
                )}
                {submittedContent && (
                    <div className="mt-6 p-4 bg-gray-800 rounded">
                    <h4 className="text-md font-semibold text-green-400 mb-1">Writer</h4>
                    <p>{submittedContent}</p>
                    </div>
                )}
            </>
        );
    
    case "Queue":
        return (
            <>
                <p>
                    A queue is a data structure that follows the FIFO (First In, First Out) principle.
                </p>
                <ul className="list-disc pl-6 mt-2">
                    <li>
                        <Link href="https://leetcode.com/problem-list/queue/" target="_blank" className="text-green-500 hover:underline">
                            Queue LeetCode Problems
                        </Link>
                    </li>
                    <li>
                        <Link href="https://leetcode.com/problem-list/monotonic-queue/" target="_blank" className="text-green-500 hover:underline">
                            Monotic Queue LeetCode Problems
                        </Link>
                    </li>
                </ul>
                {isAdmin && (
                    <div className="mt-8 bg-gray-900 p-4 rounded border border-yellow-400">
                    <h3 className="text-lg font-bold text-yellow-400 mb-2">Add Information (Admin)</h3>
                    <textarea
                        className="w-full p-2 rounded text-black"
                        rows={4}
                        placeholder="Write additional content here..."
                        value={extraContent}
                        onChange={(e) => setExtraContent(e.target.value)}
                    />
                    <button
                        onClick={handleSubmit}
                        className="mt-2 px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400"
                    >
                        Submit
                    </button>
                    </div>
                )}
                {submittedContent && (
                    <div className="mt-6 p-4 bg-gray-800 rounded">
                    <h4 className="text-md font-semibold text-green-400 mb-1">Writer</h4>
                    <p>{submittedContent}</p>
                    </div>
                )}
            </>
        );
    
    case "Deque":
        return (
            <>
                <p>
                    A deque (double-ended queue) is a data structure that allows insertions and deletions at both ends.
                </p>

                {isAdmin && (
                    <div className="mt-8 bg-gray-900 p-4 rounded border border-yellow-400">
                    <h3 className="text-lg font-bold text-yellow-400 mb-2">Add Information (Admin)</h3>
                    <textarea
                        className="w-full p-2 rounded text-black"
                        rows={4}
                        placeholder="Write additional content here..."
                        value={extraContent}
                        onChange={(e) => setExtraContent(e.target.value)}
                    />
                    <button
                        onClick={handleSubmit}
                        className="mt-2 px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400"
                    >
                        Submit
                    </button>
                    </div>
                )}
                {submittedContent && (
                    <div className="mt-6 p-4 bg-gray-800 rounded">
                    <h4 className="text-md font-semibold text-green-400 mb-1">Writer</h4>
                    <p>{submittedContent}</p>
                    </div>
                )}
            </>
        );
    
    case "Tree":
        return (
            <>
                <p>
                    A tree is a hierarchical data structure consisting of nodes connected by edges.
                </p>
                <ul className="list-disc pl-6 mt-2">
                    <li>
                        <Link href="https://leetcode.com/problem-list/tree/" target="_blank" className="text-green-500 hover:underline">
                            Tree LeetCode Problems
                        </Link>
                    </li>
                    <li>
                        <Link href="https://leetcode.com/problem-list/binary-tree/" target="_blank" className="text-green-500 hover:underline">
                            Binary Tree LeetCode Problems
                        </Link>
                    </li>
                    <li>
                        <Link href="https://leetcode.com/problem-list/segment-tree/" target="_blank" className="text-green-500 hover:underline">
                            Segment Tree LeetCode Problems
                        </Link>
                    </li>
                    <li>
                        <Link href="https://leetcode.com/problem-list/binary-indexed-tree/" target="_blank" className="text-green-500 hover:underline">
                            Binary Indexed Tree LeetCode Problems
                        </Link>
                    </li>
                    <li>
                        <Link href="https://leetcode.com/problem-list/minimum-spanning-tree/" target="_blank" className="text-green-500 hover:underline">
                            Minimum Spanning Tree LeetCode Problems
                        </Link>
                    </li>
                    <li>
                        <Link href="https://leetcode.com/problem-list/binary-search-tree/" target="_blank" className="text-green-500 hover:underline">
                            Binary Search Tree
                        </Link>
                    </li>
                </ul>
                {isAdmin && (
                    <div className="mt-8 bg-gray-900 p-4 rounded border border-yellow-400">
                    <h3 className="text-lg font-bold text-yellow-400 mb-2">Add Information (Admin)</h3>
                    <textarea
                        className="w-full p-2 rounded text-black"
                        rows={4}
                        placeholder="Write additional content here..."
                        value={extraContent}
                        onChange={(e) => setExtraContent(e.target.value)}
                    />
                    <button
                        onClick={handleSubmit}
                        className="mt-2 px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400"
                    >
                        Submit
                    </button>
                    </div>
                )}
                {submittedContent && (
                    <div className="mt-6 p-4 bg-gray-800 rounded">
                    <h4 className="text-md font-semibold text-green-400 mb-1">Writer</h4>
                    <p>{submittedContent}</p>
                    </div>
                )}
            </>
        );
    
    case "Heap":
        return (
            <>
                <p>
                    A heap is a data structure that satisfies the heap property, where the value of each node is greater than or equal to (or less than or equal to) the values of its children.
                </p>
                <Link href="https://leetcode.com/problem-list/heap-priority-queue/" target="_blank" className="text-green-500 hover:underline">
                    Heap LeetCode Problems
                </Link>
                {isAdmin && (
                    <div className="mt-8 bg-gray-900 p-4 rounded border border-yellow-400">
                    <h3 className="text-lg font-bold text-yellow-400 mb-2">Add Information (Admin)</h3>
                    <textarea
                        className="w-full p-2 rounded text-black"
                        rows={4}
                        placeholder="Write additional content here..."
                        value={extraContent}
                        onChange={(e) => setExtraContent(e.target.value)}
                    />
                    <button
                        onClick={handleSubmit}
                        className="mt-2 px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400"
                    >
                        Submit
                    </button>
                    </div>
                )}
                {submittedContent && (
                    <div className="mt-6 p-4 bg-gray-800 rounded">
                    <h4 className="text-md font-semibold text-green-400 mb-1">Writer</h4>
                    <p>{submittedContent}</p>
                    </div>
                )}
            </>
        );

    case "Graph":
        return (
            <>
                <p>
                    A graph is a data structure consisting of a set of nodes (vertices) and a set of edges that connect pairs of nodes.
                </p>
                <Link href="https://leetcode.com/problem-list/graph/" target="_blank" className="text-green-500 hover:underline">
                    Graph LeetCode Problems
                </Link>

                {isAdmin && (
                    <div className="mt-8 bg-gray-900 p-4 rounded border border-yellow-400">
                    <h3 className="text-lg font-bold text-yellow-400 mb-2">Add Information (Admin)</h3>
                    <textarea
                        className="w-full p-2 rounded text-black"
                        rows={4}
                        placeholder="Write additional content here..."
                        value={extraContent}
                        onChange={(e) => setExtraContent(e.target.value)}
                    />
                    <button
                        onClick={handleSubmit}
                        className="mt-2 px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400"
                    >
                        Submit
                    </button>
                    </div>
                )}
                {submittedContent && (
                    <div className="mt-6 p-4 bg-gray-800 rounded">
                    <h4 className="text-md font-semibold text-green-400 mb-1">Writer</h4>
                    <p>{submittedContent}</p>
                    </div>
                )}
            </>
        );
    
    case "Greedy Algorithm":
        return (
            <>
                <p>
                    Greedy algorithms make the locally optimal choice at each step with the hope of finding a global optimum solution.
                </p>
                <Link href="https://leetcode.com/tag/greedy" target="_blank" className="text-green-500 hover:underline">
                    Greedy Algorithm LeetCode Problems
                </Link>

                {isAdmin && (
                    <div className="mt-8 bg-gray-900 p-4 rounded border border-yellow-400">
                    <h3 className="text-lg font-bold text-yellow-400 mb-2">Add Information (Admin)</h3>
                    <textarea
                        className="w-full p-2 rounded text-black"
                        rows={4}
                        placeholder="Write additional content here..."
                        value={extraContent}
                        onChange={(e) => setExtraContent(e.target.value)}
                    />
                    <button
                        onClick={handleSubmit}
                        className="mt-2 px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400"
                    >
                        Submit
                    </button>
                    </div>
                )}
                {submittedContent && (
                    <div className="mt-6 p-4 bg-gray-800 rounded">
                    <h4 className="text-md font-semibold text-green-400 mb-1">Writer</h4>
                    <p>{submittedContent}</p>
                    </div>
                )}
            </>
        );
    
    case "Dynamic Programming":
        return (
            <>
                <p>
                    Dynamic programming is a technique for solving complex problems by breaking them down into simpler subproblems and storing their solutions.
                </p>
                <Link href="https://leetcode.com/problem-list/dynamic-programming/" target="_blank" className="text-green-500 hover:underline">
                    Dynamic Programming LeetCode Problems
                </Link>

                {isAdmin && (
                    <div className="mt-8 bg-gray-900 p-4 rounded border border-yellow-400">
                    <h3 className="text-lg font-bold text-yellow-400 mb-2">Add Information (Admin)</h3>
                    <textarea
                        className="w-full p-2 rounded text-black"
                        rows={4}
                        placeholder="Write additional content here..."
                        value={extraContent}
                        onChange={(e) => setExtraContent(e.target.value)}
                    />
                    <button
                        onClick={handleSubmit}
                        className="mt-2 px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400"
                    >
                        Submit
                    </button>
                    </div>
                )}
                {submittedContent && (
                    <div className="mt-6 p-4 bg-gray-800 rounded">
                    <h4 className="text-md font-semibold text-green-400 mb-1">Writer</h4>
                    <p>{submittedContent}</p>
                    </div>
                )}
            </>
        );
    
    case "Mocks Interviews":
        return (
            <>
                <p>
                    Preparation for technical interviews with mock questions and answers.
                </p>
                <Link href="" target="_blank" className="text-green-500 hover:underline">
                    Mocks Interviews
                </Link>
            </>
        );
    
    default:
      return <p>Not Available.</p>;
  }
};

export default ResourceContent;
