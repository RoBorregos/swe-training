"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Resources from "~/app/_components/nav/navResources";
import ResourceContent from "~/app/_components/resources/resourceContent";

const HomeResources = () => {
  const [selectedResource, setSelectedResource] = useState("Resources Page");

  return (
    <div className="flex">
      <div className="w-1/4 overflow-y-auto">
        <Resources onSelect={setSelectedResource} selected={selectedResource} />
      </div>
      <div className="w-3/4 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedResource}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="relative flex-1 p-6 text-white"
          >
            <h1 className="mb-4 text-4xl font-bold">{selectedResource}</h1>
            <ResourceContent topic={selectedResource} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HomeResources;
