type NavResourcesProps = {
  onSelect: (topic: string) => void;
  selected: string;
};

const topics = [
  "Resume",
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

const Resources = ({ onSelect, selected }: NavResourcesProps) => {
  return (
    <nav className="flex max-h-[75vh] min-w-[200px] flex-col gap-2 overflow-y-auto p-4 text-white">
      {topics.map((topic) => (
        <button
          key={topic}
          onClick={() => onSelect(topic)}
          className={`rounded p-2 text-left duration-300 hover:scale-105 hover:bg-gray-700 ${selected === topic ? "bg-gray-800 font-semibold underline" : ""} `}
        >
          {topic}
        </button>
      ))}
    </nav>
  );
};

export default Resources;
