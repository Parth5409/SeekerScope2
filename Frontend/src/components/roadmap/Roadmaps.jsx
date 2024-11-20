import useFetchUsersWithRoadmap from "@/hooks/useFetchUsersWithRoadmap";
import RoadmapTable from "./RoadmapTable";
import Navbar from "../shared/Navbar";

export default function Roadmaps() {
  useFetchUsersWithRoadmap();
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-xl font-bold my-5">User Roadmaps</h1>
        <RoadmapTable />
      </div>
    </div>
  );
}
