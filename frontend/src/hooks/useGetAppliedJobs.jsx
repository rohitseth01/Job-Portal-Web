import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../utils/constant";
import { setAllAppliedJobs } from "../redux/applicationSlice"; // Double check this line

const useGetAppliedJob = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);

    useEffect(() => {
        const fetchAppliedJob = async () => {
            if (!user) return;
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllAppliedJobs(res.data.application)); // Use the same name here
                }
            } catch (error) {
                if (error.response?.status !== 401) {
                    console.log(error);
                }
            }
        }
        fetchAppliedJob();
    }, [user, dispatch]); 
};

export default useGetAppliedJob;