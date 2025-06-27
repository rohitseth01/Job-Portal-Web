import axios from 'axios';
import { useEffect } from 'react';
import { JOB_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setAllJobs } from '../redux/jobSlice';

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector(store => store.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        // Change: Ensure we fetch ALL jobs if searchedQuery is empty
        const url = searchedQuery 
          ? `${JOB_API_END_POINT}/get?keyword=${searchedQuery}` 
          : `${JOB_API_END_POINT}/get`;

        const res = await axios.get(url, { withCredentials: true });
        
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchAllJobs(); 
  }, [searchedQuery, dispatch]); // It will re-run whenever a search happens
};

export default useGetAllJobs;
