type NavResources = {
  label: string;
}

const navItems: NavResources[] = [
  { label: "Complexities" },
  { label: "Arrays" },
  { label: "Searching Algorithms" },
  { label: "Sorting Algorithms" },
  { label: "Hashing" },
  { label: "Two Pointer Technique" },
  { label: "Window Sliding Technique" },
  { label: "Prefix Sum Technique" },
  { label: "String" },
  { label: "Recursion" },
  { label: "Matrix/Grid" },
  { label: "Linked List" },
  { label: "Stack" },
  { label: "Queue" },
  { label: "Deque" },
  { label: "Tree" },
  { label: "Heap" },
  { label: "Graph" },
  { label: "Greedy Algorithm" },
  { label: "Dynamic Programming" },
];

export const Resources = ({ onSelect }: { onSelect: (label: string) => void }) => {
  return (
    <nav className="flex flex-col gap-2 overflow-y-auto p-4 text-white min-w-[250px] h-screen ">
      {navItems.map((item) => (
        <button
          key={item.label}
          onClick={() => onSelect(item.label)}
          className="hover:scale-110 duration-300 ease-in-out text-left hover:bg-gray-700 px-2 py-1 rounded"
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
};

export default Resources;