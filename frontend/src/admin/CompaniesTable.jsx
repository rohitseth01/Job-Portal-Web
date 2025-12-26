import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Avatar, AvatarImage } from "../components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Edit2, MoreHorizontal, Building2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
    // Safety: Default to empty array if slice is not yet loaded
    const { companies = [], searchCompanyByText } = useSelector((store) => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        // Safety: Add optional chaining ?. before .length
        const filteredCompany = companies?.length > 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true;
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany || []);
    }, [companies, searchCompanyByText]);

    return (
        <div className="bg-white rounded-2xl">
            <Table>
                <TableCaption className="pb-6">A list of your registered organizations</TableCaption>
                <TableHeader className="bg-gray-50/50">
                    <TableRow>
                        <TableHead className="w-[100px] font-bold text-gray-700">Logo</TableHead>
                        <TableHead className="font-bold text-gray-700">Name</TableHead>
                        <TableHead className="font-bold text-gray-700">Date Registered</TableHead>
                        <TableHead className="text-right font-bold text-gray-700 pr-8">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* Safety: Use optional chaining ?.length */}
                    {filterCompany?.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-20">
                                <div className="flex flex-col items-center gap-2 text-gray-400">
                                    <Building2 size={48} strokeWidth={1} />
                                    <p className="font-medium">No companies registered yet.</p>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        filterCompany?.map((company) => (
                            <TableRow key={company._id} className="hover:bg-gray-50/40 transition-colors">
                                <TableCell className="py-4">
                                    <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden shadow-sm">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage 
                                                src={company.logo || "https://www.freeiconspng.com/uploads/office-building-icon-32.png"} 
                                                className="object-contain"
                                            />
                                        </Avatar>
                                    </div>
                                </TableCell>
                                <TableCell className="font-bold text-gray-900">{company.name}</TableCell>
                                <TableCell className="text-gray-500 font-medium">{company.createdAt?.split("T")[0]}</TableCell>
                                <TableCell className="text-right pr-8">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors outline-none">
                                                <MoreHorizontal className="text-gray-500" />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32 p-1 rounded-xl shadow-2xl border-gray-100">
                                            <div onClick={() => navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-3 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-purple-50 hover:text-[#6A38C2] rounded-lg cursor-pointer transition-all">
                                                <Edit2 className="w-4" />
                                                <span>Edit</span>
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

export default CompaniesTable;




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
// import { Edit2, MoreHorizontal } from "lucide-react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const CompaniesTable = () => {

//   const { companies,searchCompanyByText } = useSelector((store) => store.company);
//   const [filterCompany,setFilterCompany]=useState(companies)
//   const navigate=useNavigate();

//   useEffect(()=>{
//     const filteredCompany=companies.length>0 && companies.filter((company)=>{
//         if(!searchCompanyByText){
//             return true
//         }
//         return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
    
//     })
//     setFilterCompany(filteredCompany)

//   },[companies,searchCompanyByText])

//   return (
//     <div>
//       <Table>
//         <TableCaption>A list of your recent registered companies</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Logo</TableHead>
//             <TableHead>Name</TableHead>
//             <TableHead>Date</TableHead>
//             <TableHead className="text-right">Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {!filterCompany || filterCompany.length === 0 ? (
//             <span>You haven't registered any company yet.</span>
//           ) : (
//             <>
//               {filterCompany?.map((company) => (
//                 <tr>
//                   <TableCell>
//                     <Avatar>
//                       <AvatarImage src={company.logo}/>
//                     </Avatar>
//                   </TableCell>
//                   <TableCell>{company.name}</TableCell>
//                   <TableCell>{company.createdAt.split("T")[0]}</TableCell>
//                   <TableCell className="text-right cursor-pointer">
//                     <Popover>
//                       <PopoverTrigger>
//                         <MoreHorizontal />
//                       </PopoverTrigger>
//                       <PopoverContent className="w-32">
//                         <div onClick={()=>navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
//                           <Edit2 className="w-4" />
//                           <span>Edit</span>
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

// export default CompaniesTable;
