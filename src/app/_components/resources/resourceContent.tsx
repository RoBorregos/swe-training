import Link from "next/link";


const ResourceContent = ({ topic }: { topic: string }) => {
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
                    <li>To predict the behavior of an algorithm for large inputs (Scalable Software).</li>
                    <li>It is much more convenient to have simple measures for the efficiency of an algorithm than to implement the algorithm and test the efficiency every time a certain parameter in the underlying computer system changes.</li>
                    <li>More importantly, by analyzing different algorithms, we can compare them to determine the best one for our purpose.</li>
                </ul>

            <h2 className="text-xl font-semibold mb-2 mt-6">Big O Notation</h2>
                <p>
                    Big O notation is a powerful tool used in computer science to describe the time complexity or space complexity of algorithms. Big-O is a way to express the upper bound of an algorithm's time or space complexity.
                </p>
                <ul className="list-disc pl-6 mt-3">
                    <li>Describes the asymptotic behavior (order of growth of time or space in terms of input size) of a function, not its exact value.</li>
                    <li>Can be used to compare the efficiency of different algorithms or data structures.</li>
                    <li>It provides an upper limit on the time taken by an algorithm in terms of the size of the input. We mainly consider the worst case scenario of the algorithm to find its time complexity in terms of Big O</li>
                    <li>It's denoted as O(f(n)), where f(n) is a function that represents the number of operations (steps) that an algorithm performs to solve a problem of size n.</li>
                </ul>

            <h2 className="text-xl font-semibold mb-2 mt-6">Time Complexity</h2>

            <h2 className="text-xl font-semibold mb-2 mt-6">Space Complexity</h2>
            </>
        );

    case "Arrays":
        return (
            <>
                <p>
                    An array is a data structure that stores elements in contiguous memory locations, allowing efficient access by index. Arrays have a fixed size and can store elements of the same type.
                </p>
                <Link href="https://leetcode.com/problem-list/array/" target="_blank" className="text-blue-500 hover:underline">
                    Arrays LeetCode Problems
                </Link>
            </>
        );

    case "Searching Algorithms":
      return (
        <>
            <p>
                Includes linear search, binary search, etc.
            </p>
            <h2 className="font-bold">Searching Algorithms LeetCode Probelms</h2>
            <ul className="list-disc pl-6 mt-2">
                <li>
                    <Link href="https://leetcode.com/problem-list/binary-search/" target="_blank" className="text-blue-500 hover:underline">
                        Binary Search Problems
                    </Link>
                </li>
                <li>
                    <Link href="https://leetcode.com/problem-list/breadth-first-search/" target="_blank" className="text-blue-500 hover:underline">
                        Breadth-First Search
                    </Link>
                </li>
                <li>
                    <Link href="https://leetcode.com/problem-list/depth-first-search/" target="_blank" className="text-blue-500 hover:underline">
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
                QuickSort, MergeSort, BubbleSort, etc.
            </p>

            <Link href="https://leetcode.com/problem-list/sorting/" target="_blank" className="text-blue-500 hover:underline">
                Sorting LeetCode Problems
            </Link>
        </>
      );

    case "Hashing":
        return (
            <>
                <p>
                    Hashing is a technique used to map data of arbitrary size to fixed-size values, often used in hash tables for efficient data retrieval.
                </p>

                <Link href="https://leetcode.com/problem-list/hash-table/" target="_blank" className="text-blue-500 hover:underline">
                    Hashing LeetCode Problems
                </Link>
            </>
        );
    
    case "Two Pointer Technique":
        return (
            <>
                <p>
                    The two-pointer technique is a common approach for solving problems involving arrays or linked lists.
                </p>
                <Link href="https://leetcode.com/problem-list/two-pointers/" target="_blank" className="text-blue-500 hover:underline">
                    Two Pointer Technique LeetCode Problems
                </Link>
            </>
        );
    
    case "Window Sliding Technique":
        return (
            <>
                <p>
                    The sliding window technique is an approach for solving problems involving subarrays or subsequences.
                </p>
                <Link href="https://leetcode.com/problem-list/sliding-window/" target="_blank" className="text-blue-500 hover:underline">
                    Window Sliding Technique LeetCode Problems
                </Link>
            </>
        );
    
    case "Prefix Sum Technique":
        return (
            <>
                <p>
                    The prefix sum technique is an approach to efficiently calculate the sums of subarrays.
                </p>
                <Link href="https://leetcode.com/problem-list/prefix-sum/" target="_blank" className="text-blue-500 hover:underline">
                    Prefix Sum Technique LeetCode Problems
                </Link>
            </>
        );

    case "String":
        return (
            <>
                <p>
                    Strings are sequences of characters used to represent text.
                </p>
                <Link href="https://leetcode.com/problem-list/string/" target="_blank" className="text-blue-500 hover:underline">
                    String Problems
                </Link>
            </>
        );
    
    case "Recursion":
        return (
            <>
                <p>
                    Recursion is a technique where a function calls itself to solve a problem.
                </p>
                <Link href="https://leetcode.com/problem-list/recursion/" target="_blank" className="text-blue-500 hover:underline">
                    Recursion LeetCode Problems
                </Link>
            </>
        );
    
    case "Matrix/Grid":
        return (
            <>
                <p>
                    Matrices (or grids) are two-dimensional data structures that store data in rows and columns.
                </p>
                <Link href="https://leetcode.com/problem-list/matrix/" target="_blank" className="text-blue-500 hover:underline">
                    Matrix LeetCode Problems
                </Link>
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
                        <Link href="https://leetcode.com/problem-list/linked-list/" target="_blank" className="text-blue-500 hover:underline">
                            Linked List LeetCode Problems
                        </Link>
                    </li>
                    <li>
                        <Link href="https://leetcode.com/problem-list/doubly-linked-list/" target="_blank" className="text-blue-500 hover:underline">
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
                    A stack is a data structure that follows the LIFO (Last In, First Out) principle.
                </p>
                <ul className="list-disc pl-6 mt-2">
                    <li>
                        <Link href="https://leetcode.com/problem-list/stack/" target="_blank" className="text-blue-500 hover:underline">
                            Stack LeetCode Problems
                        </Link>
                    </li>
                    <li>
                        <Link href="https://leetcode.com/problem-list/monotonic-stack/" target="_blank" className="text-blue-500 hover:underline">
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
                    A queue is a data structure that follows the FIFO (First In, First Out) principle.
                </p>
                <ul className="list-disc pl-6 mt-2">
                    <li>
                        <Link href="https://leetcode.com/problem-list/queue/" target="_blank" className="text-blue-500 hover:underline">
                            Queue LeetCode Problems
                        </Link>
                    </li>
                    <li>
                        <Link href="https://leetcode.com/problem-list/monotonic-queue/" target="_blank" className="text-blue-500 hover:underline">
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
                    A deque (double-ended queue) is a data structure that allows insertions and deletions at both ends.
                </p>
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
                        <Link href="https://leetcode.com/problem-list/tree/" target="_blank" className="text-blue-500 hover:underline">
                            Tree LeetCode Problems
                        </Link>
                    </li>
                    <li>
                        <Link href="https://leetcode.com/problem-list/binary-tree/" target="_blank" className="text-blue-500 hover:underline">
                            Binary Tree LeetCode Problems
                        </Link>
                    </li>
                    <li>
                        <Link href="https://leetcode.com/problem-list/segment-tree/" target="_blank" className="text-blue-500 hover:underline">
                            Segment Tree LeetCode Problems
                        </Link>
                    </li>
                    <li>
                        <Link href="https://leetcode.com/problem-list/binary-indexed-tree/" target="_blank" className="text-blue-500 hover:underline">
                            Binary Indexed Tree LeetCode Problems
                        </Link>
                    </li>
                    <li>
                        <Link href="https://leetcode.com/problem-list/minimum-spanning-tree/" target="_blank" className="text-blue-500 hover:underline">
                            Minimum Spanning Tree LeetCode Problems
                        </Link>
                    </li>
                    <li>
                        <Link href="https://leetcode.com/problem-list/binary-search-tree/" target="_blank" className="text-blue-500 hover:underline">
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
                    A heap is a data structure that satisfies the heap property, where the value of each node is greater than or equal to (or less than or equal to) the values of its children.
                </p>
                <Link href="https://leetcode.com/problem-list/heap-priority-queue/" target="_blank" className="text-blue-500 hover:underline">
                    Heap LeetCode Problems
                </Link>
            </>
        );

    case "Graph":
        return (
            <>
                <p>
                    A graph is a data structure consisting of a set of nodes (vertices) and a set of edges that connect pairs of nodes.
                </p>
                <Link href="https://leetcode.com/problem-list/graph/" target="_blank" className="text-blue-500 hover:underline">
                    Graph LeetCode Problems
                </Link>
            </>
        );
    
    case "Greedy Algorithm":
        return (
            <>
                <p>
                    Greedy algorithms make the locally optimal choice at each step with the hope of finding a global optimum solution.
                </p>
                <Link href="https://leetcode.com/tag/greedy" target="_blank" className="text-blue-500 hover:underline">
                    Greedy Algorithm LeetCode Problems
                </Link>
            </>
        );
    
    case "Dynamic Programming":
        return (
            <>
                <p>
                    Dynamic programming is a technique for solving complex problems by breaking them down into simpler subproblems and storing their solutions.
                </p>
                <Link href="https://leetcode.com/problem-list/dynamic-programming/" target="_blank" className="text-blue-500 hover:underline">
                    Dynamic Programming LeetCode Problems
                </Link>
            </>
        );
    
    case "Mocks Interviews":
        return (
            <>
                <p>
                    Preparation for technical interviews with mock questions and answers.
                </p>
                <Link href="" target="_blank" className="text-blue-500 hover:underline">
                    Mocks Interviews
                </Link>
            </>
        );
    
    default:
      return <p>Contenido no disponible.</p>;
  }
};

export default ResourceContent;
