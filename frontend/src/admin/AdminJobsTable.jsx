import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Avatar, AvatarImage } from "../components/ui/avatar";
import { Edit2, Eye, MoreHorizontal, Briefcase, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { JOB_API_END_POINT } from "../utils/constant";
import axios from "axios";
import { toast } from "sonner";

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) return true;
            return (
                job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
            );
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    const deleteJobHandler = async (jobId) => {
        try {
            const res = await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`, {
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                setFilterJobs(prev => prev.filter(job => job._id !== jobId));
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
            <Table>
                <TableCaption className="pb-6 border-t border-gray-50 pt-4 bg-gray-50/30">
                    Manage your active job listings and review incoming applications.
                </TableCaption>
                <TableHeader className="bg-gray-50/50">
                    <TableRow>
                        <TableHead className="font-bold text-gray-700 py-5 pl-8">Company</TableHead>
                        <TableHead className="font-bold text-gray-700">Role</TableHead>
                        <TableHead className="font-bold text-gray-700">Date Posted</TableHead>
                        <TableHead className="text-right font-bold text-gray-700 pr-10">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJobs?.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-28 text-gray-500">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="p-5 bg-gray-50 rounded-full">
                                        <Briefcase size={48} strokeWidth={1} className="text-gray-300" />
                                    </div>
                                    <p className="font-bold text-gray-900 text-lg">No matches found</p>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        filterJobs?.map((job) => (
                            <TableRow key={job._id} className="group hover:bg-purple-50/30 transition-all duration-200 border-b border-gray-50">
                                <TableCell className="py-5 pl-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center overflow-hidden shadow-sm">
                                            <Avatar className="h-8 w-8 rounded-none">
                                                <AvatarImage src={job?.company?.logo} className="object-contain" />
                                            </Avatar>
                                        </div>
                                        <span className="font-bold text-gray-900">{job?.company?.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-extrabold text-gray-900 group-hover:text-[#6A38C2] transition-colors uppercase text-[13px] tracking-tight">{job?.title}</span>
                                        <span className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{job?.jobType || "Full-Time"}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="text-gray-500 font-semibold text-sm">{job?.createdAt.split("T")[0]}</span>
                                </TableCell>
                                <TableCell className="text-right pr-10">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button className="p-2 hover:bg-purple-100/50 rounded-xl transition-all outline-none group">
                                                <MoreHorizontal className="text-gray-400 group-hover:text-[#6A38C2]" />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-48 p-2 rounded-2xl shadow-2xl border-gray-100 mr-4">
                                            <div className="flex flex-col gap-1">
                                                <button onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-gray-700 hover:bg-purple-50 hover:text-[#6A38C2] rounded-xl cursor-pointer">
                                                    <Eye size={16} />
                                                    <span>Review Applicants</span>
                                                </button>
                                                <button onClick={() => navigate(`/admin/companies/${job._id}`)} className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 rounded-xl cursor-pointer">
                                                    <Edit2 size={16} />
                                                    <span>Edit Posting</span>
                                                </button>
                                                <div className="h-px bg-gray-100 my-1" />
                                                <button onClick={() => deleteJobHandler(job._id)} className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl cursor-pointer">
                                                    <Trash2 size={16} />
                                                    <span>Delete Post</span>
                                                </button>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default AdminJobsTable;






// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../components/ui/table";
// import { Avatar, AvatarImage } from "../components/ui/avatar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "../components/ui/popover";
// import { Edit2, Eye, MoreHorizontal } from "lucide-react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";


// const AdminJobsTable = () => {
  
//   const {allAdminJobs,searchJobByText} =useSelector(store=>store.job)
//   const [filterJobs,setFilterJobs]=useState(allAdminJobs)
//   const navigate=useNavigate();

//   useEffect(()=>{
//     const filteredJobs=allAdminJobs.length>0 && allAdminJobs.filter((job)=>{
//         if(!searchJobByText){
//             return true
//         }
//         return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
    
//     })
//     setFilterJobs(filteredJobs)
//   },[allAdminJobs,searchJobByText])

//   return (
//     <div>
//       <Table>
//         <TableCaption>A list of your recent posted Jobs</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Company Name</TableHead>
//             <TableHead>Role</TableHead>
//             <TableHead>Date</TableHead>
//             <TableHead className="text-right">Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {!filterJobs || filterJobs.length === 0 ? (
//             <span>You haven't registered any company yet.</span>
//           ) : (
//             <>
//               {filterJobs?.map((job) => (
//                 <tr>
                  
//                   <TableCell>{job?.company?.name}</TableCell>
//                   <TableCell>{job?.title}</TableCell>
//                   <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
//                   <TableCell className="text-right cursor-pointer">
//                     <Popover>
//                       <PopoverTrigger>
//                         <MoreHorizontal />
//                       </PopoverTrigger>
//                       <PopoverContent className="w-32">
//                         <div onClick={()=>navigate(`/admin/companies/${job._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
//                           <Edit2 className="w-4" />
//                           <span>Edit</span>
//                         </div>
//                         <div onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center w-fit gap-2 cursor-pointer mt-2 ">
//                           <Eye className="w-4"/>
//                           <span>Applicants</span>
//                         </div>
//                       </PopoverContent>
//                     </Popover>
//                   </TableCell>
//                 </tr>
//               ))}
//             </>
//           )}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default AdminJobsTable;
