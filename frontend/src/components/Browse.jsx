import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setsearchedQuery } from '../redux/jobSlice';
import useGetAllJobs from '../hooks/useGetAllJobs';
import { motion, AnimatePresence } from 'framer-motion';

const Browse = () => {
    useGetAllJobs();

    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        // Cleanup function to reset search query when leaving the page
        return () => {
            dispatch(setsearchedQuery(""));
        };
    }, [dispatch]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 my-10'>
                {/* Header with results count */}
                <div className='mb-8'>
                    <h1 className='font-extrabold text-2xl text-gray-900'>
                        Search Results <span className='text-[#6A38C2]'>({allJobs.length})</span>
                    </h1>
                    <p className='text-gray-500 text-sm font-medium mt-1'>
                        Explore the latest opportunities matching your search.
                    </p>
                </div>

                {/* Job Grid with Animations */}
                {allJobs.length <= 0 ? (
                    <div className='flex flex-col items-center justify-center h-[50vh] bg-white rounded-2xl border border-dashed border-gray-300'>
                        <h2 className='text-xl font-bold text-gray-800'>No Jobs Found</h2>
                        <p className='text-gray-500'>We couldn't find any jobs matching your current search.</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                        <AnimatePresence>
                            {allJobs.map((job, index) => {
                                return (
                                    <motion.div
                                        key={job._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                    >
                                        <Job job={job} />
                                    </motion.div>
                                )
                            })}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Browse;


// import React, { useEffect } from 'react'
// import Navbar from './shared/Navbar';
// import Job from './Job';
// import { useDispatch, useSelector } from 'react-redux';
// import { setsearchedQuery } from '../redux/jobSlice';
// import useGetAllJobs from '../hooks/useGetAllJobs';

// const Browse = () => {
//     useGetAllJobs();

//     const {allJobs}=useSelector(store=>store.job)
//     const dispatch=useDispatch()
//     useEffect(()=>{
//         return ()=>{
//             dispatch(setsearchedQuery(""))
//         }

//     },[])
    
//   return (
//     <div>
//         <Navbar/>
//         <div className='max-w-7xl  mx-auto my-10 '>
//             <h1 className='font-bold text-xl my-10'>Search Results ({allJobs.length})</h1>
//             <div className='grid grid-cols-3 gap-4 mt-5'>
//                 {
//                 allJobs.map((job)=>{
//                     return (
//                         <Job key={job._id} job={job}/>
//                     )
//                 })
//             }
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Browse