import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCompanies } from '../redux/companySlice'
import { COMPANY_API_END_POINT } from '../utils/constant'

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth); // Access user state

    useEffect(() => {
        const fetchCompanies = async () => {
            if (!user) return; // Prevent 401: only fetch if user is logged in
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                if (error.response?.status !== 401) {
                    console.log(error);
                }
            }
        }
        fetchCompanies();
    }, [user, dispatch]);
}

export default useGetAllCompanies