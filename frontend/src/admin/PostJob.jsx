import React, { useState } from "react";
import Navbar from "../components/shared/Navbar";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "../components/ui/select";
import { useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_END_POINT } from "../utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2, BriefcaseIcon } from "lucide-react";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.companyId) return toast.error("Please select a company");

    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center w-screen py-12 px-4">
        <form 
          onSubmit={submitHandler} 
          className="p-10 w-full max-w-4xl bg-white border border-gray-100 shadow-2xl shadow-purple-50 rounded-3xl"
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-purple-50 rounded-2xl text-[#6A38C2]">
              <BriefcaseIcon size={24} />
            </div>
            <h1 className="font-extrabold text-2xl text-gray-900 tracking-tight">Post New Opportunity</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Row 1 */}
            <div className="space-y-2">
              <Label className="font-bold text-gray-700">Job Title</Label>
              <Input
                type="text"
                name="title"
                placeholder="e.g. Senior Frontend Engineer"
                value={input.title}
                onChange={changeEventHandler}
                className="rounded-xl border-gray-200 focus:ring-2 focus:ring-purple-100 focus:border-[#6A38C2] transition-all"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-bold text-gray-700">Location</Label>
              <Input
                type="text"
                name="location"
                placeholder="e.g. Remote, New York"
                value={input.location}
                onChange={changeEventHandler}
                className="rounded-xl border-gray-200 focus:ring-2 focus:ring-purple-100 focus:border-[#6A38C2] transition-all"
              />
            </div>

            {/* Row 2 - Full Width Description */}
            <div className="md:col-span-2 space-y-2">
              <Label className="font-bold text-gray-700">Job Description</Label>
              <textarea
                name="description"
                rows="3"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Describe the role and responsibilities..."
                className="flex w-full rounded-xl border border-gray-200 bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-100 focus-visible:border-[#6A38C2] transition-all"
              />
            </div>

            {/* Row 3 */}
            <div className="space-y-2">
              <Label className="font-bold text-gray-700">Requirements</Label>
              <Input
                type="text"
                name="requirements"
                placeholder="React, Node.js, AWS..."
                value={input.requirements}
                onChange={changeEventHandler}
                className="rounded-xl border-gray-200 focus:ring-2 focus:ring-purple-100 focus:border-[#6A38C2] transition-all"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-bold text-gray-700">Salary (LPA)</Label>
              <Input
                type="text"
                name="salary"
                placeholder="e.g. 12"
                value={input.salary}
                onChange={changeEventHandler}
                className="rounded-xl border-gray-200 focus:ring-2 focus:ring-purple-100 focus:border-[#6A38C2] transition-all"
              />
            </div>

            {/* Row 4 */}
            <div className="space-y-2">
              <Label className="font-bold text-gray-700">Experience Level (Years)</Label>
              <Input
                type="text"
                name="experience"
                placeholder="e.g. 3"
                value={input.experience}
                onChange={changeEventHandler}
                className="rounded-xl border-gray-200 focus:ring-2 focus:ring-purple-100 focus:border-[#6A38C2] transition-all"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-bold text-gray-700">No. of Positions</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="rounded-xl border-gray-200 focus:ring-2 focus:ring-purple-100 focus:border-[#6A38C2] transition-all"
              />
            </div>

            {/* Row 5 */}
            <div className="space-y-2">
              <Label className="font-bold text-gray-700">Job Type</Label>
              <Input
                type="text"
                name="jobType"
                placeholder="Full-time, Internship..."
                value={input.jobType}
                onChange={changeEventHandler}
                className="rounded-xl border-gray-200 focus:ring-2 focus:ring-purple-100 focus:border-[#6A38C2] transition-all"
              />
            </div>

            <div className="space-y-2">
              <Label className="font-bold text-gray-700">Select Company</Label>
              {companies.length > 0 ? (
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="rounded-xl border-gray-200 focus:ring-2 focus:ring-purple-100 focus:border-[#6A38C2] transition-all">
                    <SelectValue placeholder="Which company?" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-gray-100">
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem key={company._id} value={company?.name?.toLowerCase()}>
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-xs text-red-500 font-bold mt-2 animate-pulse">
                  ⚠️ No companies found. Please register one first.
                </p>
              )}
            </div>
          </div>

          <div className="mt-10">
            {loading ? (
              <Button disabled className="w-full bg-[#6A38C2] rounded-xl py-6 font-bold shadow-lg shadow-purple-100">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Publishing Job...
              </Button>
            ) : (
              <Button 
                type="submit" 
                disabled={companies.length === 0}
                className="w-full bg-[#6A38C2] hover:bg-[#5a2eb0] rounded-xl py-6 font-bold text-white shadow-lg shadow-purple-100 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Post Job Opening
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;


// import React, { useState } from "react";
// import Navbar from "../components/shared/Navbar";
// import { Label } from "../components/ui/label";
// import { Input } from "../components/ui/input";
// import { Button } from "../components/ui/button";
// import {
//   Select,
//   SelectValue,
//   SelectTrigger,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
// } from "../components/ui/select";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { JOB_API_END_POINT } from "../utils/constant";
// import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";
// import { Loader2 } from "lucide-react";

// const companyArray = [];

// const PostJob = () => {
//   const [input, setInput] = useState({
//     title: "",
//     description: "",
//     requirements: "",
//     salary: "",
//     location: "",
//     jobType: "",
//     experience: "",
//     position: 0,
//     companyId: "",
//   });

//   const [loading,setLoading]=useState(false);
//   const navigate=useNavigate();

//   const { companies } = useSelector((store) => store.company);

//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const selectChangeHandler=(value)=>{
//     const selectedCompany=companies.find((company)=>company.name.toLowerCase()===value)
//     setInput({...input,companyId:selectedCompany._id})
//   }

//   const submitHandler=async(e)=>{
//     e.preventDefault();
    
//     try {
//       setLoading(true);
//       const res=await axios.post(`${JOB_API_END_POINT}/post`,input,{
//         headers:{
//           'Content-Type':'application/json'
//         },
//         withCredentials:true
//       })
//       if(res.data.success){
//         toast.success(res.data.message)
//         navigate("/admin/jobs")
//       }

//     } catch (error) {
//       toast.error(error.response.data.message)
//     }
//     finally{
//       setLoading(false)
//     }
    
//   }

//   return (
//     <div>
//       <Navbar />
//       <div className="flex items-center justify-center w-screen my-5">
//         <form onSubmit={submitHandler} className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md">
//           <div className="grid grid-cols-2 gap-2">
//             <div>
//               <Label>Title</Label>
//               <Input
//                 type="text"
//                 name="title"
//                 value={input.title}
//                 onChange={changeEventHandler}
//                 className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
//               />
//             </div>
//             <div>
//               <Label>Description</Label>
//               <Input
//                 type="text"
//                 name="description"
//                 value={input.description}
//                 onChange={changeEventHandler}
//                 className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
//               />
//             </div>
//             <div>
//               <Label>Requirements</Label>
//               <Input
//                 type="text"
//                 name="requirements"
//                 value={input.requirements}
//                 onChange={changeEventHandler}
//                 className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
//               />
//             </div>
//             <div>
//               <Label>Salary</Label>
//               <Input
//                 type="text"
//                 name="salary"
//                 value={input.salary}
//                 onChange={changeEventHandler}
//                 className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
//               />
//             </div>
//             <div>
//               <Label>Location</Label>
//               <Input
//                 type="text"
//                 name="location"
//                 value={input.location}
//                 onChange={changeEventHandler}
//                 className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
//               />
//             </div>
//             <div>
//               <Label>Job Type</Label>
//               <Input
//                 type="text"
//                 name="jobType"
//                 value={input.jobType}
//                 onChange={changeEventHandler}
//                 className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
//               />
//             </div>
//             <div>
//               <Label>Experience Level</Label>
//               <Input
//                 type="text"
//                 name="experience"
//                 value={input.experience}
//                 onChange={changeEventHandler}
//                 className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
//               />
//             </div>
//             <div>
//               <Label>No of Position</Label>
//               <Input
//                 type="number"
//                 name="position"
//                 value={input.position}
//                 onChange={changeEventHandler}
//                 className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
//               />
//             </div>
//             {companies.length > 0 && (
//               <Select onValueChange={selectChangeHandler}>
//                 <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Select a Company" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     {companies.map((company) => {
//                       return (
//                         <SelectItem value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
//                       );
//                     })}
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//             )}
//           </div>

//           {loading ? (
//             <Button className="w-full my-4">
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               Please Wait
//             </Button>
//           ) : (
//             <Button type="submit" className="w-full my-4">
//               Post a new Job
//             </Button>
//           )}

//           {companies.length === 0 && (
//             <p className="text-xs text-red-600 font-bold text-center my-3">
//               Please Register a company first,before posting a jobs
//             </p>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PostJob;
