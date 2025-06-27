import React, { useState } from "react";
// Go up one level (..) to exit 'admin' folder, then into 'components/shared'
import Navbar from "../components/shared/Navbar"; 
// Go up one level, then into 'components/ui'
import { Avatar, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { useSelector } from "react-redux";
// Ensure this component path is correct based on where you saved it
import UpdateProfileDialog from "../components/UpdateProfileDialog"; 

const AdminProfile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10">
        
        {/* Profile Card */}
        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
          <div className="flex justify-between items-start">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="h-28 w-28 border-4 border-purple-50 shadow-md">
                <AvatarImage
                  src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"}
                  alt="admin-profile"
                />
              </Avatar>
              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <h1 className="font-extrabold text-2xl text-gray-900">{user?.fullname}</h1>
                  <span className="bg-purple-100 text-[#6A38C2] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Admin
                  </span>
                </div>
                <p className="text-gray-500 mt-1 max-w-md leading-relaxed italic">
                  {user?.profile?.bio || "Professional Recruiter Dashboard"}
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

          {/* Account Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 p-6 bg-gray-50 rounded-2xl">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</span>
              <div className="flex items-center gap-3 text-gray-700">
                <Mail className="text-[#6A38C2]" size={18} />
                <span className="font-semibold">{user?.email}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone Number</span>
              <div className="flex items-center gap-3 text-gray-700">
                <Contact className="text-[#6A38C2]" size={18} />
                <span className="font-semibold">{user?.phoneNumber || "Not Provided"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
              <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider">Role</h3>
              <p className="text-[#6A38C2] font-black text-xl mt-1 uppercase">Recruiter</p>
           </div>
           <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
              <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider">Member Since</h3>
              <p className="text-gray-800 font-black text-xl mt-1">{user?.createdAt?.split("T")[0] || "N/A"}</p>
           </div>
        </div>
      </div>
      
      {/* Update Dialog Component */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default AdminProfile;