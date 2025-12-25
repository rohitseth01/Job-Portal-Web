import axios from 'axios';
import { useEffect } from 'react';
import { JOB_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setAllJobs } from '../redux/jobSlice';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth); // Added this line

    useEffect(() => {
        const fetchAllJobs = async () => {
            // STOP: Only fetch if user is logged in to avoid 401 errors in console
            if (!user) return; 

            try {
                const url = searchedQuery 
                    ? `${JOB_API_END_POINT}/get?keyword=${searchedQuery}` 
                    : `${JOB_API_END_POINT}/get`;

                const res = await axios.get(url, { withCredentials: true });
                
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                // Ignore 401s in console since they are expected before login session settles
                if (error.response?.status !== 401) {
                    console.error("Error fetching jobs:", error);
                }
            }
        };
        fetchAllJobs(); 
    }, [searchedQuery, dispatch, user]); // Added user to dependency array
};

export default useGetAllJobs;