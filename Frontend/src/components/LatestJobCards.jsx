import { useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";

export default function LatestJobCards({ job }) {
  let checkNumber = job?.salary;
  if (checkNumber) {
    let len = checkNumber.toString().length;
    if (len == 6) checkNumber /= 100000;
  }
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/jobs/description/${job._id}`)}
      className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer"
    >
      <div>
        <h1 className="font-medium text-lg">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">{job?.location}</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">
          {job?.description?.split(" ").slice(0, 20).join(" ")}...
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className={"text-[#F83002] font-bold"} variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className={"text-[#7209B7] font-bold"} variant="ghost">
          {checkNumber} LPA
        </Badge>
      </div>
    </div>
  );
}
