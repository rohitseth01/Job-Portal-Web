import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { MoreHorizontal, FileText, CheckCircle2, XCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "../utils/constant";
import axios from "axios";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Status update failed");
    }
  };

  return (
    <div className="bg-white rounded-2xl">
      <Table>
        <TableCaption className="pb-6">A detailed list of recent applicants</TableCaption>
        <TableHeader className="bg-gray-50/50">
          <TableRow>
            <TableHead className="font-bold text-gray-700">Full Name</TableHead>
            <TableHead className="font-bold text-gray-700">Email</TableHead>
            <TableHead className="font-bold text-gray-700">Contact</TableHead>
            <TableHead className="font-bold text-gray-700">Resume</TableHead>
            <TableHead className="font-bold text-gray-700">Applied Date</TableHead>
            <TableHead className="text-right font-bold text-gray-700 pr-8">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.applications?.map((item) => (
            <TableRow key={item._id} className="hover:bg-gray-50/40 transition-colors">
              <TableCell className="font-semibold text-gray-900">
                {item?.applicant?.fullname}
              </TableCell>
              <TableCell className="text-gray-600">
                {item?.applicant?.email}
              </TableCell>
              <TableCell className="text-gray-600">
                {item?.applicant?.phoneNumber}
              </TableCell>
              <TableCell>
                {item?.applicant?.profile?.resume ? (
                  <a
                    href={item?.applicant?.profile?.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#6A38C2] hover:underline font-medium group"
                  >
                    <FileText size={16} className="text-gray-400 group-hover:text-[#6A38C2]" />
                    <span className="truncate max-w-[150px]">
                        {item?.applicant?.profile?.resumeOriginalName}
                    </span>
                  </a>
                ) : (
                  <span className="text-gray-400 italic">Not Uploaded</span>
                )}
              </TableCell>
              <TableCell className="text-gray-500">
                {item?.applicant?.createdAt?.split("T")[0]}
              </TableCell>
              <TableCell className="text-right pr-8">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors outline-none">
                      <MoreHorizontal className="text-gray-500" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-40 p-1 rounded-xl shadow-2xl border-gray-100">
                    <div className="flex flex-col">
                      <div
                        onClick={() => statusHandler("Accepted", item?._id)}
                        className="flex items-center gap-3 px-3 py-2 text-sm font-semibold text-green-600 hover:bg-green-50 rounded-lg cursor-pointer transition-all"
                      >
                        <CheckCircle2 size={16} />
                        <span>Shortlist</span>
                      </div>
                      <div
                        onClick={() => statusHandler("Rejected", item?._id)}
                        className="flex items-center gap-3 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-all"
                      >
                        <XCircle size={16} />
                        <span>Reject</span>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;


// import React from "react";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../components/ui/table";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "../components/ui/popover";
// import { MoreHorizontal } from "lucide-react";
// import { useSelector } from "react-redux";
// import { toast } from "sonner";
// import { APPLICATION_API_END_POINT } from "../utils/constant";
// import axios from "axios";

// const shortlistingStatus = ["Accepted", "Rejected"];

// const ApplicantsTable = () => {
//   const { applicants } = useSelector((store) => store.application);

//   const statusHandler=async(status,id)=>{
//     try {
//       axios.defaults.withCredentials=true;
//       const res=await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`,{status},{
//         withCredentials:true
//       })

//       if(res.data.success){
//         toast.success(res.data.message)
//       }
//     } catch (error) {
//       toast.error(error.response.data.message)
//     }
//   }

//   return (
//     <div>
//       <Table>
//         <TableCaption>A list of your recent applied user</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Full Name</TableHead>
//             <TableHead>Email</TableHead>
//             <TableHead>Contact</TableHead>
//             <TableHead>Resume</TableHead>
//             <TableHead>Date</TableHead>
//             <TableHead className="text-right">Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {applicants &&
//             applicants?.applications?.map((item) => (
//               <tr key={item._id}>
//                 <TableCell>{item?.applicant?.fullname}</TableCell>
//                 <TableCell>{item?.applicant?.email}</TableCell>
//                 <TableCell>{item?.applicant?.phoneNumber}</TableCell>
//                 <TableCell>
//                   {item?.applicant?.profile?.resume ? (
//                     <a
//                       className="text-blue-600 cursor-pointer"
//                       href={item?.applicant?.profile?.resumeOriginalName}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       {item?.applicant?.profile?.resumeOriginalName}{" "}
//                     </a>
//                   ) : (
//                     <span>NA</span>
//                   )}
//                 </TableCell>
//                 <TableCell>
//                   {item?.applicant?.createdAt.split("T")[0]}
//                 </TableCell>
//                 <TableCell className="float-right cursor-pointer">
//                   <Popover>
//                     <PopoverTrigger>
//                       <MoreHorizontal />
//                     </PopoverTrigger>
//                     <PopoverContent className="w-32">
//                       {shortlistingStatus.map((status, index) => {
//                         return (
//                           <div
//                             onClick={()=>statusHandler(status,item?._id)}
//                             key={index}
//                             className="flex w-fit items-center my-2 cursor-pointer"
//                           >
//                             <span>{status}</span>
//                           </div>
//                         );
//                       })}
//                     </PopoverContent>
//                   </Popover>
//                 </TableCell>
//               </tr>
//             ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default ApplicantsTable;
