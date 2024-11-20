import { Bookmark, Edit } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RoadmapCard({ roadmap }) {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="p-5 rounded-md shadow-lg bg-white border border-gray-100">
      {/* Year and User Info */}
      <div className="flex items-center gap-2 my-2">
        <div>
          <h1 className="font-medium text-lg">{roadmap.year}</h1>
        </div>
      </div>

      {/* Title and Achievements */}
      <div>
        <h1 className="font-bold text-lg my-2">{roadmap.title}</h1>
        <ul className="list-disc ml-5 space-y-1">
          {roadmap.achievements.map((achievement, idx) => (
            <li key={idx}>{achievement}</li>
          ))}
        </ul>
      </div>

      {/* Edit Button */}
      {/* {roadmap.author === user._id && (
        <div className="flex items-center gap-4 mt-6">
          <Button
            className="w-full"
            onClick={() => navigate(`/roadmaps/edit/${roadmap._id}`)}
          >
            <Edit className="w-4 mr-3" /> Edit
          </Button>
        </div>
      )} */}
    </div>
  );
}
