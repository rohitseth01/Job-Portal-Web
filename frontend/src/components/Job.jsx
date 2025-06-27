import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from './ui/badge'
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    const days = Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    return days;
  };

  const daysAgo = daysAgoFunction(job?.createdAt);

  return (
    <div className="p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 bg-white border border-gray-100 flex flex-col h-full group">
      
      {/* Top Section: Timeline & Save */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-semibold text-gray-400">
          {daysAgo === 0 ? "Posted Today" : `${daysAgo} days ago`}
        </p>
        <Button 
          variant="ghost" 
          className="rounded-full h-9 w-9 p-0 text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-colors"
        >
          <Bookmark size={20} />
        </Button>
      </div>

      {/* Middle Section: Company Branding */}
      <div className="flex items-center gap-4 mb-4">
        <div className="p-2 bg-gray-50 border border-gray-100 rounded-xl overflow-hidden shadow-sm">
          <Avatar className="h-10 w-10">
            <AvatarImage 
              src={job?.company?.logo || "https://www.freeiconspng.com/uploads/office-building-icon-32.png"} 
              className="object-contain"
            />
          </Avatar>
        </div>
        <div className="overflow-hidden">
          <h1 className="font-bold text-gray-900 truncate">{job?.company?.name}</h1>
          <p className="text-xs text-gray-500 font-medium">India • Remote Available</p>
        </div>
      </div>

      {/* Main Content: Title & Desc */}
      <div className="flex-grow">
        <h1 className="font-extrabold text-xl text-gray-800 mb-2 group-hover:text-[#6A38C2] transition-colors leading-tight">
          {job?.title}
        </h1>
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-4">
          {job?.description}
        </p>
      </div>

      {/* Tags Section: Soft UI Badges */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <Badge className="bg-blue-50 text-blue-700 border-none font-bold px-3 py-1 text-[10px]" variant="outline">
          {job?.position} Positions
        </Badge>
        <Badge className="bg-red-50 text-[#F83002] border-none font-bold px-3 py-1 text-[10px]" variant="outline">
          {job?.jobType}
        </Badge>
        <Badge className="bg-purple-50 text-[#7209b7] border-none font-bold px-3 py-1 text-[10px]" variant="outline">
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center gap-3 mt-auto">
        <Button 
          onClick={() => navigate(`/description/${job?._id}`)} 
          variant="outline" 
          className="flex-1 rounded-lg font-bold border-gray-200 hover:bg-gray-50 transition-all active:scale-95"
        >
          Details
        </Button>
        <Button 
          className="flex-1 bg-[#7209b7] hover:bg-[#5f32ad] rounded-lg font-bold text-white shadow-md shadow-purple-100 transition-all active:scale-95"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default Job;

// import React from "react";
// import { Button } from "./ui/button";
// import { Bookmark } from "lucide-react";
// import { Avatar, AvatarImage } from "./ui/avatar";
// import {Badge} from  './ui/badge'
// import { useNavigate } from "react-router-dom";



// const Job = ({job}) => {
//   const navigate=useNavigate();
//   // const jobId="lnindfouwbjmznfkiencs"
//   const  daysAgoFunction=(mongodbTime)=>{
//     const createdAt=new Date(mongodbTime);
//     const currentTime=new Date();
//     const timeDifference=currentTime-createdAt;
//     return Math.floor(timeDifference/(1000*24*60*60))
//   }

//   return (
//     <div className="p-5 rounded-xl shadow-xl bg-white border border-gray-100">
//       <div className="flex items-center justify-between">
//         <p className="text-sm text-gray-500">{daysAgoFunction(job?.createdAt)===0 ?"Today": `${daysAgoFunction(job?.createdAt) }`} days ago</p>
//         <Button variant="outline" className="rounded-full" size="icon">
//           <Bookmark />
//         </Button>
//       </div>

//       <div className="flex items-center gap-2 my-2">
//         <Button className="p-6 " variant="outline" size="icon">
//           <Avatar>
//             <AvatarImage src={job?.company?.logo} />
//           </Avatar>
//         </Button>
//         <div>
//           <h1 className="font-medium text-lg">{job?.company?.name}</h1>
//           <p className="text-sm text-gray-500">India</p>
//         </div>
//       </div>

//       <div>
//         <h1 className="font-bold text-lg my-2">{job?.title}</h1>
//         <p className="text-sm text-gray-600">
//           {job?.description}
//         </p>
//       </div>
//       <div className="flex items-center gap-2 mt-4 ">
//         <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
//         <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
//         <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary} LPA</Badge>
//       </div>
//       <div className="flex items-center gap-4 mt-4">
//         <Button onClick={()=>navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
//         <Button className="bg-[#7209b7]">Save For Later</Button>
//       </div>
//     </div>

//   );
// };

// export default Job;
