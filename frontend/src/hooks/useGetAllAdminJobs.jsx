import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAllAdminJobs } from '../redux/jobSlice'
import { JOB_API_END_POINT } from '../utils/constant'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth); // Added user check

    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            if (!user) return; // Stop the 401: Don't fetch if no user is logged in
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllAdminJobs(res.data.jobs));
                }
            } catch (error) {
                if (error.response?.status !== 401) {
                    console.log(error);
                }
            }
        }
        fetchAllAdminJobs();
    }, [user, dispatch]); // Re-run when user logs in
}

export default useGetAllAdminJobs