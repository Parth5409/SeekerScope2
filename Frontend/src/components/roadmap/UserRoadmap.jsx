import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RoadmapCard from "./RoadmapCard";
import Navbar from "../shared/Navbar";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import useFetchUsersWithRoadmap from "@/hooks/useFetchUsersWithRoadmap";

export default function UserRoadmap() {
  useFetchUsersWithRoadmap();
  const { id } = useParams(); // Retrieve user ID from URL params
  const { userWithRoadmap } = useSelector((store) => store.user); // Access userWithRoadmap from Redux store
  const [userRoadmap, setUserRoadmap] = useState(null); // Local state to store the matched user's roadmap
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate(); // Hook for navigation

  // Find the user in the userWithRoadmap array with a matching _id
  useEffect(() => {
    const matchedUser = userWithRoadmap.find((user) => user._id === id);
    setUserRoadmap(matchedUser); // Set the matched user to local state
  }, [id, userWithRoadmap]);
  const matchedUserRoadmap = userWithRoadmap.find((user) => user._id === id);
  
  return (
    <div>
      <Navbar />
      {/* Title Section with Username and Create Roadmap Button */}
      <div className="max-w-6xl mx-auto mt-5 p-4">
        { ( 
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-semibold">
              Roadmap for {matchedUserRoadmap.fullname}
            </h2>
            {user._id === id && <Button
              onClick={() => navigate(`/roadmaps/${user._id}/create`)}
              className="bg-[#7209B7] font-bold text-center"
            >
              Create Roadmap
            </Button>}
          </div>
        )}
      </div>

      <div className="max-w-xl mx-auto mt-5 p-4">
        <div className="flex flex-col gap-5">
          {userRoadmap ? (
            <div className="grid grid-cols-1 gap-4">
              {userRoadmap.roadmaps.map((roadmap, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                >
                  <RoadmapCard roadmap={roadmap} />{" "}
                  {/* Pass roadmap data as prop */}
                </motion.div>
              ))}
            </div>
          ) : (
            <span>No roadmap found for this user</span>
          )}
        </div>
      </div>
    </div>
  );
}
