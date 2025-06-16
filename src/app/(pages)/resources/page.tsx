'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Resources from "~/app/_components/Nav/navResources";
import ResourceContent from "~/app/_components/resources/resourceContent";
import '~/styles/globals.css'
const HomeResources = () => {
  const [selectedResource, setSelectedResource] = useState("Resources Page");

  return (
    <div className="flex"> 
      <div className="w-1/4 overflow-y-auto">
        <Resources onSelect={setSelectedResource} />
      </div>
      <div className="w-3/4 overflow-y-auto"> 
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedResource}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="p-6 flex-1 text-white relative"
          >
            <h1 className="text-4xl font-bold mb-4">{selectedResource}</h1>
            <ResourceContent topic={selectedResource} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HomeResources;