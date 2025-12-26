import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  // Use the correct slice: application, not job
  const { allAppliedJobs } = useSelector((store) => store.application);

  // Helper to style status badges
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "rejected":
        return "bg-red-100 text-red-600 hover:bg-red-100 border-none";
      case "pending":
        return "bg-gray-100 text-gray-600 hover:bg-gray-100 border-none";
      case "accepted":
        return "bg-green-100 text-green-600 hover:bg-green-100 border-none";
      default:
        return "bg-blue-100 text-blue-600 hover:bg-blue-100 border-none";
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <Table>
        <TableCaption className="mb-4">
          A list of your recent job applications
        </TableCaption>
        <TableHeader className="bg-gray-50/50">
          <TableRow>
            <TableHead className="w-[120px] font-bold text-gray-700">
              Date
            </TableHead>
            <TableHead className="font-bold text-gray-700">Job Role</TableHead>
            <TableHead className="font-bold text-gray-700">Company</TableHead>
            <TableHead className="text-right font-bold text-gray-700">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length <= 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center py-10 text-gray-500 italic"
              >
                You haven't applied to any jobs yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow
                key={appliedJob?._id}
                className="hover:bg-gray-50/50 transition-colors duration-200"
              >
                <TableCell className="font-medium text-gray-600">
                  {appliedJob?.createdAt?.split("T")[0]}
                </TableCell>
                <TableCell className="font-semibold text-gray-800">
                  {appliedJob?.job?.title}
                </TableCell>
                <TableCell className="text-gray-600">
                  {appliedJob?.job?.company?.name}
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`font-bold px-3 py-1 rounded-full text-[10px] ${getStatusStyle(
                      appliedJob.status
                    )}`}
                  >
                    {appliedJob?.status?.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;

// import React from "react";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "./ui/table";
// import { Badge } from "./ui/badge";
// import { useSelector } from "react-redux";

// const AppliedJobTable = () => {
//   const {allAppliedJobs}=useSelector(store=>store.job)
//   return (
//     <div>
//       <Table>
//         <TableCaption>A List of your applied Jobs</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Date</TableHead>
//             <TableHead>Job Role</TableHead>
//             <TableHead>Company</TableHead>
//             <TableHead className="text-right">Status</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {
//           allAppliedJobs.length <= 0 ? <span>You haven't applied Job yet.</span>: allAppliedJobs.map((appliedJob) => (
//             <TableRow key={appliedJob?._id}>
//                 <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
//                 <TableCell>{appliedJob?.job?.title}</TableCell>
//                 <TableCell>{appliedJob?.job?.company?.name}</TableCell>
//                 <TableCell className="text-right"><Badge className={`${appliedJob?.status==="rejected" ?  "bg-red-400":appliedJob.status==="pending" ? "bg-gray-400":"bg-green-400" }`}>{appliedJob?.status.toUpperCase()}</Badge></TableCell>
//             </TableRow>

//           ))
//           }
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default AppliedJobTable;
