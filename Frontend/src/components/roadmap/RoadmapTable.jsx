import { MoreHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RoadmapTable() {
  const navigate = useNavigate();
  const { userWithRoadmap } = useSelector((store) => store.user);

  return (
    <div className="p-4 space-y-4">
      <Table className="shadow-md rounded-lg overflow-hidden">
        <TableCaption>A list of users with their roadmaps</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userWithRoadmap?.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.fullname}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="cursor-pointer text-gray-500 hover:text-gray-700" />
                  </PopoverTrigger>
                  <PopoverContent className="w-32 cursor-pointer">
                    <div
                      onClick={() => navigate(`/roadmaps/${user._id}`)}
                      className="p-2 hover:bg-gray-100 cursor-pointer rounded-md"
                    >
                      <span>View Roadmap</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
