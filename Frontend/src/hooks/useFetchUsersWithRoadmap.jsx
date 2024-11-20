import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUserWithRoadmap } from "@/redux/userSlice";

const useFetchUsersWithRoadmap = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsersWithRoadmap = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/users`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setUserWithRoadmap(res.data.usersWithRoadmap)); // Save the users with roadmaps in the store
        }
      } catch (error) {
        console.log("Error fetching users with roadmaps:", error);
      }
    };

    fetchUsersWithRoadmap();
  }, [dispatch]); // Dependency array includes dispatch to avoid unnecessary re-fetching
};

export default useFetchUsersWithRoadmap;
