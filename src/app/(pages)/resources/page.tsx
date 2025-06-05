'use client';

import { useState } from "react";
import Resources from "~/app/_components/Nav/navResources";
import ResourceContent from "~/app/_components/resources/resourceContent";

const HomeResources = () => {
  const [selectedResource, setSelectedResource] = useState("Complexities");

  return (
    <div className="flex">
      <Resources onSelect={setSelectedResource} />
      <div className="p-6 flex-1 text-white">
        <h1 className="text-2xl font-bold mb-4">{selectedResource}</h1>
        <ResourceContent topic={selectedResource} />
      </div>
    </div>
  );
};

export default HomeResources;
