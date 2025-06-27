import React, { useEffect, useState } from "react";
import Navbar from "../components/shared/Navbar";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import AdminJobsTable from "./AdminJobsTable";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useGetAllAdminJobs from "../hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "../redux/jobSlice";
import { Plus, Search, Briefcase, Users, Building2 } from "lucide-react";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Access data for metrics
  const { allAdminJobs } = useSelector((store) => store.job);
  const { companies } = useSelector((store) => store.company);

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10">
        
        {/* Dashboard Header Section */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
              <Briefcase className="text-[#6A38C2]" />
              Manage Jobs
            </h1>
            <p className="text-gray-500 font-medium mt-1">
              Track, edit, and manage all your active job postings.
            </p>
          </div>
        </div>

        {/* 1. Metric Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: "Total Jobs", value: allAdminJobs?.length || 0, icon: Briefcase, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Active Companies", value: companies?.length || 0, icon: Building2, color: "text-purple-600", bg: "bg-purple-50" },
            { label: "Total Reach", value: "2.4k", icon: Users, color: "text-orange-600", bg: "bg-orange-50" },
          ].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className={`p-4 ${item.bg} ${item.color} rounded-2xl`}>
                <item.icon size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.label}</p>
                <h2 className="text-2xl font-black text-gray-900">{item.value}</h2>
              </div>
            </div>
          ))}
        </div>

        {/* Search & Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="relative w-full sm:w-96 group">
            <Search 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#6A38C2] transition-colors" 
              size={18} 
            />
            <Input 
              className="pl-10 rounded-xl border-gray-200 focus:ring-4 focus:ring-purple-50 focus:border-[#6A38C2] transition-all" 
              placeholder="Filter by job title or role..." 
              onChange={(e) => setInput(e.target.value)} 
            />
          </div>
          
          <Button 
            onClick={() => navigate("/admin/jobs/create")}
            className="w-full sm:w-auto bg-[#6A38C2] hover:bg-[#5a2eb0] rounded-xl px-8 py-6 font-bold text-white shadow-lg shadow-purple-100 transition-all active:scale-95 flex items-center gap-2"
          >
            <Plus size={20} />
            Post New Job
          </Button>
        </div>

        {/* 2. Table Container with improved layout */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {/* You could wrap AdminJobsTable in a loader condition if needed */}
          <AdminJobsTable />
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;

// import React, { useEffect, useState } from "react";
// import Navbar from "../components/shared/Navbar";
// import { Input } from "../components/ui/input";
// import { Button } from "../components/ui/button";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import AdminJobsTable from "./AdminJobsTable";
// import useGetAllAdminJobs from "../hooks/useGetAllAdminJobs";
// import { setSearchJobByText } from "../redux/jobSlice";


// const AdminJobs = () => {
//   useGetAllAdminJobs()
//   const [input,setInput]=useState("");
//   const dispatch=useDispatch();

//   useEffect(()=>{
//     dispatch(setSearchJobByText(input))
//   },[input])

//   const navigate=useNavigate()
//   return (
//     <div>
//       <Navbar />
//       <div className="max-w-6xl mx-auto my-10">
//         <div className="flex items-center justify-between my-5">
//           <Input className="w-fit" placeholder="Filter by name or role" onChange={(e)=>setInput(e.target.value)} />
//           <Button onClick={()=>navigate("/admin/jobs/create")}>New Jobs</Button>
//         </div>
//         <AdminJobsTable/>
//       </div>
//     </div>
//   );
// };

// export default AdminJobs;
