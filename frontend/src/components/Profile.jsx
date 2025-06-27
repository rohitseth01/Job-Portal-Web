import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "@/components/ui/button";
import { Contact, Mail, Pen, FileText } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "../hooks/useGetAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10">
        
        {/* Main Profile Card */}
        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
          <div className="flex justify-between items-start">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="h-28 w-28 border-4 border-purple-50 shadow-md">
                <AvatarImage
                  src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"}
                  alt="profile"
                />
              </Avatar>
              <div className="text-center md:text-left">
                <h1 className="font-extrabold text-2xl text-gray-900">{user?.fullname}</h1>
                <p className="text-gray-500 mt-1 max-w-md leading-relaxed">
                  {user?.profile?.bio || "Add a short bio to introduce yourself."}
                </p>
              </div>
            </div>
            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              size="icon"
              className="rounded-xl border-gray-200 hover:text-[#6A38C2] hover:bg-purple-50 transition-all"
            >
              <Pen size={18} />
            </Button>
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8 p-4 bg-gray-50 rounded-2xl">
            <div className="flex items-center gap-3 text-gray-700">
              <Mail className="text-[#6A38C2]" size={20} />
              <span className="font-medium">{user?.email}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Contact className="text-[#6A38C2]" size={20} />
              <span className="font-medium">{user?.phoneNumber || "No phone added"}</span>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {user?.profile?.skills?.length > 0 ? (
                user?.profile?.skills.map((item, index) => (
                  <Badge 
                    key={index} 
                    className="bg-purple-50 text-[#6A38C2] border-none font-bold px-4 py-1.5 rounded-lg hover:bg-purple-100 transition-colors"
                  >
                    {item}
                  </Badge>
                ))
              ) : (
                <span className="text-gray-400 italic">No skills added yet.</span>
              )}
            </div>
          </div>

          {/* Resume Section */}
          <div className="flex flex-col gap-2 border-t border-gray-100 pt-6">
            <Label className="text-sm font-bold uppercase tracking-wider text-gray-400">Resume</Label>
            {user?.profile?.resume ? (
              <a
                target="_blank"
                rel="noreferrer"
                href={user?.profile?.resume}
                className="flex items-center gap-3 w-fit bg-white border border-gray-200 p-3 rounded-xl hover:border-[#6A38C2] hover:text-[#6A38C2] transition-all group"
              >
                <FileText className="text-gray-400 group-hover:text-[#6A38C2]" />
                <span className="font-bold text-sm truncate max-w-xs">
                  {user?.profile?.resumeOriginalName || "Download Resume"}
                </span>
              </a>
            ) : (
              <span className="text-gray-400 italic">Resume not uploaded.</span>
            )}
          </div>
        </div>

        {/* Applied Jobs Table Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Applied Jobs</h2>
          <AppliedJobTable />
        </div>
      </div>
      
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;


// import React, { useState } from "react";
// import Navbar from "./shared/Navbar";
// import { Avatar, AvatarImage } from "./ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Contact, Mail, Pen } from "lucide-react";
// import { Badge } from "./ui/badge";
// import { Label } from "./ui/label";
// import AppliedJobTable from "./AppliedJobTable";
// import UpdateProfileDialog from "./UpdateProfileDialog";
// import { useSelector } from "react-redux";
// import useGetAppliedJobs from "../hooks/useGetAppliedJobs";

// // const skils = ["Html", "CSS", "Javascript", "ReactJs"];
// const isResume = true;

// const Profile = () => {
//   useGetAppliedJobs();
//   const [open, setOpen] = useState(false);
//   const { user } = useSelector((store) => store.auth);

//   return (
//     <div>
//       <Navbar />
//       <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
//         <div className="flex justify-between">
//           <div className="flex items-center gap-4">
//             <Avatar className="h-24 w-24">
//               <AvatarImage
//                 src={
//                   user?.profile?.profilePhoto ||
//                   "https://cdn-icons-png.flaticon.com/512/174/174857.png"
//                 }
//                 alt="profile"
//               />
//             </Avatar>

//             <div>
//               <h1 className="font-medium text-xl">{user?.fullname}</h1>
//               <p>{user?.profile?.bio}</p>
//             </div>
//           </div>
//           <Button
//             onClick={() => setOpen(true)}
//             className="text-right"
//             variant="outline"
//           >
//             <Pen />
//           </Button>
//         </div>
//         <div className="my-5">
//           <div className="flex items-center gap-3 my-2">
//             <Mail />
//             <span>{user?.email}</span>
//           </div>
//           <div className="flex items-center gap-3 my-2">
//             <Contact />
//             <span>{user?.phoneNumber}</span>
//           </div>
//         </div>

//         <div>
//           <h1>Skills</h1>
//           <div className="flex items-center gap-1">
//             {user?.profile?.skills.length != 0 ? (
//               user?.profile?.skills.map((item, index) => (
//                 <Badge key={index}>{item}</Badge>
//               ))
//             ) : (
//               <span>NA</span>
//             )}
//           </div>
//         </div>

//         <div className="grid w-full max-w-sm items-center gap-1.5">
//           <Label className="text-md font-bold">Resume</Label>
//           {isResume ? (
//             <a
//               target="blank"
//               href={user?.profile?.resume}
//               className="text-blue-500 w-full hover:underline cursor-pointer"
//             >
//               {user?.profile?.resumeOriginalName}
//             </a>
//           ) : (
//             <span>NA</span>
//           )}
//         </div>
//       </div>
//       <div className="max-w-4xl mx-auto bg-white rounded-2xl">
//         <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
//         {/* Application Table */}
//         <AppliedJobTable />
//       </div>
//       <UpdateProfileDialog open={open} setOpen={setOpen} />
//     </div>
//   );
// };

// export default Profile;
