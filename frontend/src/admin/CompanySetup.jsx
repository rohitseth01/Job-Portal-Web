import React, { useEffect, useState } from "react";
import Navbar from "../components/shared/Navbar";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { ArrowLeft, Loader2, Building2 } from "lucide-react";
import { Label } from "../components/ui/label";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "../hooks/useGetCompanyById";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || null,
    });
  }, [singleCompany]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <form onSubmit={submitHandler} className="bg-white border border-gray-100 rounded-3xl p-8 shadow-2xl shadow-purple-50">
          
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <Button
                type="button"
                onClick={() => navigate("/admin/companies")}
                variant="ghost"
                className="rounded-full hover:bg-gray-100 p-2"
              >
                <ArrowLeft className="text-gray-600" />
              </Button>
              <div>
                <h1 className="font-extrabold text-2xl text-gray-900 tracking-tight">Company Setup</h1>
                <p className="text-sm text-gray-500 font-medium">Complete your organization profile</p>
              </div>
            </div>
            <div className="hidden md:flex p-3 bg-purple-50 rounded-2xl text-[#6A38C2]">
               <Building2 size={24} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="font-bold text-gray-700">Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                className="rounded-xl border-gray-200 focus:ring-2 focus:ring-purple-100 focus:border-[#6A38C2]"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-bold text-gray-700">Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
                placeholder="https://example.com"
                className="rounded-xl border-gray-200 focus:ring-2 focus:ring-purple-100 focus:border-[#6A38C2]"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-bold text-gray-700">Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="rounded-xl border-gray-200 focus:ring-2 focus:ring-purple-100 focus:border-[#6A38C2]"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-bold text-gray-700">Company Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="cursor-pointer file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-purple-50 file:text-[#6A38C2] hover:file:bg-purple-100"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label className="font-bold text-gray-700">Description</Label>
              <textarea
                name="description"
                rows="4"
                value={input.description}
                onChange={changeEventHandler}
                className="flex w-full rounded-xl border border-gray-200 bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-100 focus-visible:border-[#6A38C2] disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>

          <div className="mt-10">
            {loading ? (
              <Button disabled className="w-full bg-[#6A38C2] rounded-xl py-6 font-bold shadow-lg shadow-purple-100">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Saving Changes...
              </Button>
            ) : (
              <Button type="submit" className="w-full bg-[#6A38C2] hover:bg-[#5a2eb0] rounded-xl py-6 font-bold text-white shadow-lg shadow-purple-100 transition-all active:scale-95">
                Update Profile
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;

// import React, { useEffect, useState } from "react";
// import Navbar from "../components/shared/Navbar";
// import { Input } from "../components/ui/input";
// import { Button } from "../components/ui/button";
// import { ArrowLeft, Loader2 } from "lucide-react";
// import { Label } from "../components/ui/label";
// import axios from "axios";
// import { COMPANY_API_END_POINT } from "../utils/constant";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "sonner";
// import { useSelector } from "react-redux";
// import useGetCompanyById from "../hooks/useGetCompanyById";

// const CompanySetup = () => {
//   const params = useParams();
//   useGetCompanyById(params.id)
  
//   const [input, setInput] = useState({
//     name: "",
//     description: "",
//     website: "",
//     location: "",
//     file: null,
//   });

//   const { singleCompany } = useSelector((store) => store.company);

//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const changeFileHandler = (e) => {
//     const file = e.target.files?.[0];
//     setInput({ ...input, file });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("name", input.name);
//     formData.append("description", input.description);
//     formData.append("website", input.website);
//     formData.append("location", input.location);
//     if (input.file) {
//       formData.append("file", input.file);
//     }

//     try {
//       setLoading(true);
//       const res = await axios.put(
//         `${COMPANY_API_END_POINT}/update/${params.id}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//           withCredentials: true,
//         }
//       );
//       if (res.data.success) {
//         toast.success(res.data.message);
//         navigate("/admin/companies");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response.data.message);
//     } finally {
//       setLoading(false);
//     }

//   };

//   useEffect(() => {
//     setInput({
//       name: singleCompany.name || "",
//       description:singleCompany.description || "",
//       website:singleCompany.website || "",
//       location:singleCompany.location || "",
//       file: singleCompany.file || null,
//     });
//   },[singleCompany]);

//   return (
//     <div>
//       <Navbar />
//       <div className="max-w-xl mx-auto my-10">
//         <form onSubmit={submitHandler}>
//           <div className="flex  items-center gap-5 p-8">
//             <Button
//               onClick={() => navigate("/admin/companies")}
//               variant="outline"
//               className="flex items-center gap-2 text-gray-500 font-semibold"
//             >
//               <ArrowLeft />
//               <span>Back</span>{" "}
//             </Button>
//             <h1 className="font-bold text-xl">Company Setup</h1>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <Label>Company Name</Label>
//               <Input
//                 type="text"
//                 name="name"
//                 value={input.name}
//                 onChange={changeEventHandler}
//               />
//             </div>
//             <div>
//               <Label>Description</Label>
//               <Input
//                 type="text"
//                 name="description"
//                 value={input.description}
//                 onChange={changeEventHandler}
//               />
//             </div>
//             <div>
//               <Label>Website</Label>
//               <Input
//                 type="text"
//                 name="website"
//                 value={input.website}
//                 onChange={changeEventHandler}
//               />
//             </div>
//             <div>
//               <Label>Location</Label>
//               <Input
//                 type="text"
//                 name="location"
//                 value={input.location}
//                 onChange={changeEventHandler}
//               />
//             </div>
//             <div>
//               <Label>Logo</Label>
//               <Input
//                 type="file"
//                 accept="image/*"
//                 onChange={changeFileHandler}
//               />
//             </div>
//           </div>

//           {loading ? (
//             <Button className="w-full my-4">
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               Please Wait
//             </Button>
//           ) : (
//             <Button type="submit" className="w-full my-4">
//               Update
//             </Button>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CompanySetup;
