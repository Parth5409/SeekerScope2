import { setSingleAdminJob } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function useGetSingleAdminJob(jobId) {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleAdminJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
          withCredentials: true,
        });
        if (res.data.success) {
            const matchingJob = res.data.jobs.find((job) => job._id === jobId);
          dispatch(setSingleAdminJob(matchingJob));
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchSingleAdminJob();
  }, [jobId]);
}
