import { CssSyntaxError } from "postcss";

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
            </>
        );

    case "Searching Algorithms":
      return (
        <>
            <p>
                Includes linear search, binary search, etc.
            </p>
        </>
      );

    case "Sorting Algorithms":
      return (
        <>
            <p>
                QuickSort, MergeSort, BubbleSort, etc.
            </p>
        </>
      );

    case "Hashing":
        return (
            <>
                <p>
                    Hashing is a technique used to map data of arbitrary size to fixed-size values, often used in hash tables for efficient data retrieval.
                </p>
            </>
        );
    
    case "Two Pointer Technique":
        return (
            <>
                <p>
                    The two-pointer technique is a common approach for solving problems involving arrays or linked lists.
                </p>
            </>
        );
    
    case "Window Sliding Technique":
        return (
            <>
                <p>
                    The sliding window technique is an approach for solving problems involving subarrays or subsequences.
                </p>
            </>
        );
    
    case "Prefix Sum Technique":
        return (
            <>
                <p>
                    The prefix sum technique is an approach to efficiently calculate the sums of subarrays.
                </p>
            </>
        );

    case "String":
        return (
            <>
                <p>
                    Strings are sequences of characters used to represent text.
                </p>
            </>
        );
    
    case "Recursion":
        return (
            <>
                <p>
                    Recursion is a technique where a function calls itself to solve a problem.
                </p>
            </>
        );
    
    case "Matrix/Grid":
        return (
            <>
                <p>
                    Matrices (or grids) are two-dimensional data structures that store data in rows and columns.
                </p>
            </>
        );
    
    case "Linked List":
        return (
            <>
                <p>
                    A linked list is a data structure consisting of nodes, where each node contains a value and a reference to the next node.
                </p>
            </>
        );

    case "Stack":
        return (
            <>
                <p>
                    A stack is a data structure that follows the LIFO (Last In, First Out) principle.
                </p>
            </>
        );
    
    case "Queue":
        return (
            <>
                <p>
                    A queue is a data structure that follows the FIFO (First In, First Out) principle.
                </p>
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
            </>
        );
    
    case "Heap":
        return (
            <>
                <p>
                    A heap is a data structure that satisfies the heap property, where the value of each node is greater than or equal to (or less than or equal to) the values of its children.
                </p>
            </>
        );

    case "Graph":
        return (
            <>
                <p>
                    A graph is a data structure consisting of a set of nodes (vertices) and a set of edges that connect pairs of nodes.
                </p>
            </>
        );
    
    case "Greedy Algorithm":
        return (
            <>
                <p>
                    Greedy algorithms make the locally optimal choice at each step with the hope of finding a global optimum solution.
                </p>
            </>
        );
    
    case "Dynamic Programming":
        return (
            <>
                <p>
                    Dynamic programming is a technique for solving complex problems by breaking them down into simpler subproblems and storing their solutions.
                </p>
            </>
        );
    
    case "Mocks Interviews":
        return (
            <>
                <p>
                    Preparation for technical interviews with mock questions and answers.
                </p>
            </>
        );
    
    default:
      return <p>Contenido no disponible.</p>;
  }
};

export default ResourceContent;
