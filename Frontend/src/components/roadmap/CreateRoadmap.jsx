import { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import axios from "axios";
import { ROADMAP_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Textarea } from "../ui/textarea";

export default function CreateRoadmap() {
  const [input, setInput] = useState({
    year: "",
    title: "",
    achievements: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${ROADMAP_API_END_POINT}/new`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(res);
      
      if (res.data.success) {
        toast.success(res.data.message);
        navigate(`/roadmaps/${params.id}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create roadmap.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-10">
        <form
          className="mx-24 p-8 w-full border border-gray-200 shadow-lg rounded-md" // Increased width here
          onSubmit={submitHandler}
        >
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label>Year</Label>
              <Input
                type="text"
                name="year"
                value={input.year}
                onChange={changeEventHandler}
                placeholder="Enter year (e.g., 2024)"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                placeholder="Enter roadmap title"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Achievements</Label>
              <Textarea
                name="achievements"
                value={input.achievements}
                onChange={changeEventHandler}
                placeholder="Separate achievements with a period (e.g., 'Achievement 1. Achievement 2')"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 resize-none border rounded-md p-2"
                rows={4}
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Create New Roadmap
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
