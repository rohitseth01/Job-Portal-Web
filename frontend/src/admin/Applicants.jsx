import React, { useEffect } from 'react'
import Navbar from '../components/shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '../utils/constant'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '../redux/applicationSlice'
import { ArrowLeft, Users } from 'lucide-react'
import { Button } from '../components/ui/button'

const Applicants = () => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, {
                    withCredentials: true
                })
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllApplicants();
    }, [params.id, dispatch]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 py-10'>
                
                {/* Optimized Back Navigation */}
                <div className='flex items-center gap-4 mb-8'>
                    <Button 
                        onClick={() => navigate("/admin/jobs")} 
                        variant="ghost" 
                        size="icon" 
                        className="rounded-full hover:bg-gray-100"
                    >
                        <ArrowLeft className="text-gray-600" />
                    </Button>
                    <div>
                        <h1 className='font-extrabold text-2xl text-gray-900 tracking-tight flex items-center gap-3'>
                           <Users className="text-[#6A38C2]" />
                           Applicants Management
                        </h1>
                        <p className='text-gray-500 font-medium text-sm'>
                            Review and manage candidates for this position
                        </p>
                    </div>
                </div>

                {/* Metric Summary */}
                <div className='bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-8 flex items-center justify-between'>
                    <span className='text-gray-600 font-bold'>Total Candidates</span>
                    <span className='bg-purple-50 text-[#6A38C2] px-4 py-1 rounded-full text-sm font-black'>
                        {applicants?.applications?.length || 0}
                    </span>
                </div>

                {/* Applicants Data Table Container */}
                <div className='bg-white rounded-3xl shadow-xl shadow-purple-50/50 border border-gray-100 overflow-hidden'>
                    <ApplicantsTable />
                </div>
            </div>
        </div>
    )
}

export default Applicants;


// import React, { useEffect } from 'react'
// import Navbar from '../components/shared/Navbar'
// import ApplicantsTable from './ApplicantsTable'
// import axios from 'axios'
// import { APPLICATION_API_END_POINT } from '../utils/constant'
// import { useParams} from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { setAllApplicants } from '../redux/applicationSlice'

// const Applicants = () => {
//   const params=useParams();
//   const dispatch=useDispatch();
//   const {applicants} =useSelector(store=>store.application);


//   useEffect(()=>{
//     const fetchAllApplicants=async()=>{
//       try {
//         const res=await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`,{
//           withCredentials:true
//         })
//         dispatch(setAllApplicants(res.data.job));
//       } catch (error) {
//         console.log(error)
//       }
//     }
//     fetchAllApplicants();

//   },[])

//   return (
//     <div>
//         <Navbar/>
//         <div className='max-w-7xl mx-auto'>
//             <h1 className='font-bold text-xl my-5'>Applicants {applicants.applications.length}</h1>
//             <ApplicantsTable/>

//         </div>
//     </div>
//   )
// }

// export default Applicants