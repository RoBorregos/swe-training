type NavResources = {
  href: string;
  label: string;
}

export const Resources = () => {
  return (
    <nav className="flex gap-10 items-center overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 text-white px-4 py-2">
      <a>Complexities</a>
      <a>Arrays</a>
      <a>Searching Algorithms</a>
      <a>Sorting Algorithms</a>
      <a>Hashing</a>
      <a>Two Pointer Technique</a>
      <a>Window Sliding Technique</a>
      <a>Prefix Sum Technique</a>
      <a>String</a>
      <a>Recursion</a>
      <a>Matrix/Grid</a>
      <a>Linked List</a>
      <a>Stack</a>
      <a>Queue</a>
      <a>Deque</a>
      <a>Tree</a>
      <a>Heap</a>
      <a>Graph</a>
      <a>Greedy Algorithm</a>
      <a>Dynamic Programming</a>
    </nav>
  );
};

export default Resources;
