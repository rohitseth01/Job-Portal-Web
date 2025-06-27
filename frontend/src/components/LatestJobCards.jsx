import React from "react";
import { Badge } from './ui/badge'
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/description/${job?._id}`)} 
      className="p-6 rounded-xl shadow-md hover:shadow-2xl hover:translate-y-[-5px] bg-white border border-gray-100 cursor-pointer transition-all duration-300 flex flex-col justify-between h-full"
    >
      {/* Top Section: Company Branding */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h1 className="font-bold text-gray-900 text-lg">{job?.company?.name}</h1>
          <p className="text-xs font-medium text-gray-400">India • Just now</p>
        </div>
        {/* Placeholder for Logo - Improves visual appeal significantly */}
        <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
           <img 
             src={job?.company?.logo || "https://www.freeiconspng.com/uploads/office-building-icon-32.png"} 
             alt="logo" 
             className="w-8 h-8 object-contain"
           />
        </div>
      </div>

      {/* Middle Section: Job Info */}
      <div className="mb-4">
        <h1 className="font-extrabold text-xl text-gray-800 mb-2 group-hover:text-[#6A38C2] transition-colors">
          {job?.title}
        </h1>
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
          {job?.description}
        </p>
      </div>

      {/* Bottom Section: Modern Pill Badges */}
      <div className="flex flex-wrap items-center gap-2 mt-auto">
        <Badge 
          className="bg-blue-50 text-blue-700 border-none px-3 py-1 text-[10px] font-bold" 
          variant="outline"
        >
          {job?.position} Positions
        </Badge>
        <Badge 
          className="bg-red-50 text-[#F83002] border-none px-3 py-1 text-[10px] font-bold" 
          variant="outline"
        >
          {job?.jobType}
        </Badge>
        <Badge 
          className="bg-purple-50 text-[#7209b7] border-none px-3 py-1 text-[10px] font-bold" 
          variant="outline"
        >
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;

// import React from "react";
// import {Badge} from  './ui/badge'
// import { useNavigate } from "react-router-dom";

// const LatestJobCards = ({job}) => {
//   const navigate=useNavigate();
//   return (
//     <div onClick={()=>navigate(`/description/${job._id}`) } className="p-5 rounded-md shadow-xl bg-white border-gray-100 cursor-pointer">
//       <div>
//         <h1 className="font-medium text-lg">{job?.company?.name}</h1>
//         <p className="text-sm text-gray-500">India</p>
//       </div>
//       <div>
//         <h1 className="font-bold text-lg my-2">{job?.title}</h1>
//         <p  className="text-sm text-gray-600">
//           {job?.description}
//         </p>
//       </div>
//       <div className="flex items-center gap-2 mt-4 ">
//         <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position}Positions</Badge>
//         <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
//         <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary}LPA</Badge>
//       </div>
//     </div>
//   );
// };

// export default LatestJobCards;
