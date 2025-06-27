import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "../redux/jobSlice";
import { JOB_API_END_POINT, APPLICATION_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';

const JobDescription = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const jobId = params.id;
  const { singleJob } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);
  
  const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-12 px-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-gray-200">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
            {singleJob?.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="bg-blue-50 text-blue-700 border-none px-4 py-1.5 text-xs font-bold" variant="outline">
              {singleJob?.position} Positions
            </Badge>
            <Badge className="bg-red-50 text-[#F83002] border-none px-4 py-1.5 text-xs font-bold" variant="outline">
              {singleJob?.jobType}
            </Badge>
            <Badge className="bg-purple-50 text-[#7209b7] border-none px-4 py-1.5 text-xs font-bold" variant="outline">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`h-12 px-10 rounded-full font-bold transition-all shadow-lg ${
            isApplied
              ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200 shadow-none"
              : "bg-[#7209b7] text-white hover:bg-[#5f32ad] active:scale-95"
          }`}
        >
          {isApplied ? "Application Sent" : "Apply Now"}
        </Button>
      </div>

      {/* Content Section */}
      <div className="py-10">
        <h2 className="text-xl font-bold text-gray-900 border-l-4 border-[#7209b7] pl-4 mb-8">
          Job Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900 min-w-[120px]">Role:</span>
            <span className="text-gray-600">{singleJob?.title}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900 min-w-[120px]">Location:</span>
            <span className="text-gray-600">{singleJob?.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900 min-w-[120px]">Experience:</span>
            <span className="text-gray-600">{singleJob?.experienceLevel} Years</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900 min-w-[120px]">Salary:</span>
            <span className="text-gray-600">{singleJob?.salary} LPA</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900 min-w-[120px]">Applicants:</span>
            <span className="text-gray-600">{singleJob?.applications?.length} Candidates</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900 min-w-[120px]">Posted Date:</span>
            <span className="text-gray-600">{singleJob?.createdAt?.split("T")[0]}</span>
          </div>
        </div>

        {/* Description Text Area */}
        <div className="mt-12 bg-gray-50 rounded-2xl p-8 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Detailed Description</h3>
          <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
            {singleJob?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;

// import React, { useEffect, useState } from "react";
// import { Badge } from "./ui/badge";
// import { Button } from "./ui/button";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { setSingleJob } from "../redux/jobSlice";
// import {JOB_API_END_POINT}from '@/utils/constant'
// import { APPLICATION_API_END_POINT } from './../utils/constant';
// import { toast } from 'sonner';


// const JobDescription = () => {
//   const dispatch=useDispatch();
//   const params=useParams();
//   const jobId=params.id;
//   const {singleJob} =useSelector(store=>store.job)
//   const {user}=useSelector(store=>store.auth)
//   const isIntiallyApplied=singleJob?.applications?.some(application=>application.applicant==user?._id)||false;
//   const [isApplied,setIsApplied]=useState(isIntiallyApplied)
  

//   const applyJobHandler=async()=>{
//     try {
//         const res=await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`,{withCredentials:true});
//         console.log(res.data);
        
//         if(res.data.success){
//             setIsApplied(true) //update the local state
//             const updatedSingleJob={...singleJob,applications:[...singleJob.applications,{applicant:user?._id}]}
//             dispatch(setSingleJob(updatedSingleJob)) //helps us to real time ui update
//             toast.success(res.data.message);

//         }
//     } catch (error) {
//         console.log(error);
//         toast.error(error.response.data.message)
        
//     }
//   }


//   useEffect(() => {
//     const fetchSingleJob = async () => {
//       try {
//         const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
//           withCredentials: true,
//         });
//         console.log(res.data.job);
        
//         if (res.data.success) {
//           dispatch(setSingleJob(res.data.job));
//           setIsApplied(res.data.job.applications.some(application=>application.applicant===user?._id)) //ensure the state is in sync with fetched data
//         }

//       } catch (error) {
//         console.error("Error fetching jobs:", error);
//       }
//     };

//     fetchSingleJob(); 
//   }, [jobId,dispatch,user?._id]);
  

//   return (
//     <div className="max-w-7xl mx-auto my-10">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="font-bold text-xl">{singleJob?.title}</h1>
//           <div className="flex items-center gap-2 mt-4 ">
//             <Badge className={"text-blue-700 font-bold"} variant="ghost">
//               {singleJob?.position} Position
//             </Badge>
//             <Badge className={"text-[#F83002] font-bold"} variant="ghost">
//               {singleJob?.jobType}
//             </Badge>
//             <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
//               {singleJob?.salary} LPA
//             </Badge>
//           </div>
//         </div>
//         <Button
//           onClick={isApplied?null:applyJobHandler}
//           disabled={isApplied}
//           className={`rounded-lg ${
//             isApplied
//               ? "bg-gray-600 cursor-not-allowed"
//               : "bg-[#7209b7] hover:bg-[#5f32ad]"
//           }`}
//         >
//           {isApplied ? "Already Applied" : "Apply Now"}
//         </Button>
//       </div>
//       <h1 className="border-b-2 border-b-gray-300 font-md py-4">Job Description</h1>
//       <div className="my-4">
//         <h1 className="font-bold my-1">Role:<span className="pl-4 font-normal text-gray-800 ">{singleJob?.title}</span></h1>
//         <h1 className="font-bold my-1">Location:<span className="pl-4 font-normal text-gray-800 ">{singleJob?.location}</span></h1>
//         <h1 className="font-bold my-1">Description:<span className="pl-4 font-normal text-gray-800 ">{singleJob?.description}</span></h1>
//         <h1 className="font-bold my-1">Experience:<span className="pl-4 font-normal text-gray-800 ">{singleJob?.experienceLevel} yrs</span></h1>
//         <h1 className="font-bold my-1">Salary:<span className="pl-4 font-normal text-gray-800 ">{singleJob?.salary}LPA</span></h1>
//         <h1 className="font-bold my-1">Total Applicants:<span className="pl-4 font-normal text-gray-800 "> {singleJob?.applications?.length}</span></h1>
//         <h1 className="font-bold my-1">Posted Date:<span className="pl-4 font-normal text-gray-800 ">{singleJob?.createdAt.split("T")[0]}</span></h1>
//       </div>
//     </div>
//   );
// };

// export default JobDescription;
