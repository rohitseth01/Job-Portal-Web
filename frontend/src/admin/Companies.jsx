import React, { useEffect, useState } from "react";
import Navbar from "../components/shared/Navbar";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "../hooks/useGetAllCompanies";
import { useDispatch, useSelector } from "react-redux";
import { setSearchCompanyByText } from "../redux/companySlice";
import { Plus, Search, Building2, Globe, ArrowRight } from "lucide-react";

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Accessing companies from store for metrics
  const { companies } = useSelector(store => store.company);

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10">
        
        {/* Header Section with Breadcrumbs */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
             <span>Admin</span>
             <ArrowRight size={10} />
             <span className="text-[#6A38C2]">Companies</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Company Management
          </h1>
          <p className="text-gray-500 font-medium mt-1">
            Register and manage your organizations here.
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="p-4 bg-purple-50 text-[#6A38C2] rounded-2xl">
                    <Building2 size={24} />
                </div>
                <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Companies</p>
                    <h2 className="text-2xl font-black text-gray-900">{companies?.length || 0}</h2>
                </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl">
                    <Globe size={24} />
                </div>
                <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Global Reach</p>
                    <h2 className="text-2xl font-black text-gray-900">Active</h2>
                </div>
            </div>
        </div>

        {/* Search & Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="relative w-full sm:w-96 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#6A38C2] transition-colors" size={18} />
            <Input 
              className="pl-10 rounded-xl border-gray-200 focus:ring-4 focus:ring-purple-50 focus:border-[#6A38C2] transition-all" 
              placeholder="Filter companies by name..." 
              onChange={(e) => setInput(e.target.value)} 
            />
          </div>
          
          <Button 
            onClick={() => navigate("/admin/companies/create")}
            className="w-full sm:w-auto bg-[#6A38C2] hover:bg-[#5a2eb0] rounded-xl px-8 py-6 font-bold text-white shadow-lg shadow-purple-100 transition-all active:scale-95 flex items-center gap-2"
          >
            <Plus size={20} />
            New Company
          </Button>
        </div>

        {/* Data Table Container */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
          <CompaniesTable />
        </div>
      </div>
    </div>
  );
};

export default Companies;



// import React, { useEffect, useState } from "react";
// import Navbar from "../components/shared/Navbar";
// import { Input } from "../components/ui/input";
// import { Button } from "../components/ui/button";
// import CompaniesTable from "./CompaniesTable";
// import { useNavigate } from "react-router-dom";
// import useGetAllCompanies from "../hooks/useGetAllCompanies";
// import { useDispatch } from "react-redux";
// import { setSearchCompanyByText } from "../redux/companySlice";

// const Companies = () => {
//   useGetAllCompanies();
//   const [input,setInput]=useState("");
//   const dispatch=useDispatch();

//   useEffect(()=>{
//     dispatch(setSearchCompanyByText(input))
//   },[input])

//   const navigate=useNavigate()
//   return (
//     <div>
//       <Navbar />
//       <div className="max-w-6xl mx-auto my-10">
//         <div className="flex items-center justify-between my-5">
//           <Input className="w-fit" placeholder="Filter by name" onChange={(e)=>setInput(e.target.value)} />
//           <Button onClick={()=>navigate("/admin/companies/create")}>New Company</Button>
//         </div>
//         <CompaniesTable/>
//       </div>
//     </div>
//   );
// };

// export default Companies;
