import React, { useState } from "react";
import Navbar from "../components/shared/Navbar";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../redux/companySlice";
import { Building2, ArrowLeft } from "lucide-react";

const CompanyCreate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [companyName, setCompanyName] = useState("");

    const registerNewCompany = async () => {
        if (!companyName.trim()) {
            return toast.error("Company name is required");
        }
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-16">
                
                {/* Back Button */}
                <button 
                    onClick={() => navigate("/admin/companies")}
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 transition-colors font-medium"
                >
                    <ArrowLeft size={18} />
                    Back to Companies
                </button>

                <div className="bg-white border border-gray-100 rounded-3xl p-10 shadow-2xl shadow-purple-50">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-purple-50 rounded-2xl text-[#6A38C2]">
                            <Building2 size={28} />
                        </div>
                        <div>
                            <h1 className="font-extrabold text-3xl text-gray-900 tracking-tight">Register Your Company</h1>
                            <p className="text-gray-500 font-medium mt-1">
                                Start by giving your organization a name. You can update this and add a logo later.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="companyName" className="text-sm font-bold text-gray-700">Company Name</Label>
                            <Input
                                id="companyName"
                                type="text"
                                className="rounded-xl py-6 border-gray-200 focus:ring-2 focus:ring-purple-100 focus:border-[#6A38C2] transition-all text-lg font-medium"
                                placeholder="Google, Microsoft, etc."
                                onChange={(e) => setCompanyName(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center gap-4 pt-4">
                            <Button 
                                variant="outline" 
                                onClick={() => navigate("/admin/companies")}
                                className="flex-1 rounded-xl py-6 font-bold border-gray-200 hover:bg-gray-50 transition-all active:scale-95"
                            >
                                Cancel
                            </Button>
                            <Button 
                                onClick={registerNewCompany}
                                className="flex-[2] bg-[#6A38C2] hover:bg-[#5a2eb0] rounded-xl py-6 font-bold text-white shadow-lg shadow-purple-100 transition-all active:scale-95"
                            >
                                Create & Continue
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyCreate;


// import React, { useState } from "react";
// import Navbar from "../components/shared/Navbar";
// import { Label } from "../components/ui/label";
// import { Input } from "../components/ui/input";
// import { Button } from "../components/ui/button";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { COMPANY_API_END_POINT } from "../utils/constant";
// import { toast } from "sonner";
// import { useDispatch } from "react-redux";
// import { setSingleCompany } from "../redux/companySlice";

// const CompanyCreate = () => {
//     const navigate=useNavigate();
//     const dispatch=useDispatch();
//     const [companyName,setCompanyNmae]=useState()

//     const registerNewCompany=async()=>{
//         try {
//             const res=await axios.post(`${COMPANY_API_END_POINT}/register`,{companyName},{
//                 headers:{
//                     'Content-Type':'application/json'
//                 },
//                 withCredentials:true
//             })
//             if(res?.data?.success){
//                 dispatch(setSingleCompany(res.data.company))
//                 toast.success(res.data.message)
//                 const companyId=res?.data?.company?._id;
//                 navigate(`/admin/companies/${companyId}`)

//             }
//         } catch (error) {
//             console.log(error);
            
//         }
//     }

//   return (
//     <div>
//       <Navbar />
//       <div className="max-w-4xl mx-auto">
//         <div className="my-10">
//           <h1 className="font-bold text-2xl">Your Company Name</h1>
//           <p className="text-gray-500">
//             What would you like to give your company name? you can change this
//             late.
//           </p>
//         </div>

//         <Label>Company Name</Label>
//         <Input
//           type="text"
//           className="my-2"
//           placeholder="JobHunt, Microsoft, etc"
//           onChange={(e)=>setCompanyNmae(e.target.value)}
//         />
//         <div className="flex items-center gap-2 my-10">
//             <Button variant="outline"  onClick={()=>navigate("/admin/companies")}>Cancel</Button>
//             <Button onClick={registerNewCompany}>Continue</Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CompanyCreate;
