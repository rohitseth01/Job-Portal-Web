import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSingleCompany } from '../redux/companySlice'
import { COMPANY_API_END_POINT } from '../utils/constant'

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth); // Access user state

    useEffect(() => {
        const fetchSingleCompany = async () => {
            if (!user || !companyId) return; // Prevent 401: only fetch if user is logged in
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                if (error.response?.status !== 401) {
                    console.log(error);
                }
            }
        }
        fetchSingleCompany();
    }, [companyId, user, dispatch]);
}

export default useGetCompanyById