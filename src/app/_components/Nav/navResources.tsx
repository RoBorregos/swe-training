type NavResourcesProps = {
  onSelect: (topic: string) => void;
}

const topics = [
  "Complexities and Analysis of Algorithm",
  "Arrays",
  "Searching Algorithms",
  "Sorting Algorithms",
  "Hashing",
  "Two Pointer Technique",
  "Window Sliding Technique",
  "Prefix Sum Technique",
  "String",
  "Recursion",
  "Matrix/Grid",
  "Linked List",
  "Stack",
  "Queue",
  "Deque",
  "Tree",
  "Heap",
  "Graph",
  "Greedy Algorithm",
  "Dynamic Programming",
  "Mocks Interviews",
];

const Resources = ({ onSelect }: NavResourcesProps) => {
  return (
    <nav className="flex flex-col gap-2 p-4 text-white min-w-[200px] h-screen">
      {topics.map((topic) => (
        <button
          key={topic}
          onClick={() => onSelect(topic)}
          className="text-left hover:bg-gray-700 p-2 rounded hover:scale-105 duration-300"
        >
          {topic}
        </button>
      ))}
    </nav>
  );
};

export default Resources;