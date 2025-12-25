import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../utils/constant";
import { setAllAppliedJobs } from "../redux/applicationSlice";

const useGetAppliedJob = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth); // Added user check

    useEffect(() => {
        const fetchAppliedJob = async () => {
            if (!user) return; // Stop the 401: Don't fetch if no user is logged in
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllAppliedJobs(res.data.application));
                }
            } catch (error) {
                if (error.response?.status !== 401) {
                    console.log(error);
                }
            }
        }
        fetchAppliedJob();
    }, [user, dispatch]); // Re-run when user logs in
};

export default useGetAppliedJob;