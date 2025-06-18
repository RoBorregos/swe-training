'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Resources from "~/app/_components/Nav/navResources";
import ResourceContent from "~/app/_components/resources/resourceContent";
import '~/styles/globals.css'
import { api } from "~/trpc/server";

const HomeResources = () => {
  const [selectedResource, setSelectedResource] = useState("Resources Page");

  // Uncomment the following lines if you want to fetch user data based on the user's role from the database 
  //const { data: userData, isLoading, error } = api.user.getUserStatus.useQuery();
  //const userRole: "admin" | "user" = userData.role;

  return (
    <div className="flex"> 
      <div className="w-1/4 overflow-y-auto">
        <Resources onSelect={setSelectedResource} selected={selectedResource}/>
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
            <ResourceContent topic={selectedResource} userRole={userRole} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HomeResources;