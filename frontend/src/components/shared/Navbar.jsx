import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, User2Icon, Briefcase, Building2, LayoutDashboard, PhoneCall } from "lucide-react"; // Added PhoneCall icon
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { USER_API_END_POINT } from "./../../utils/constant";
import axios from "axios";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-20 px-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">
            <Link to="/" className="flex items-center gap-1">
              <span className="text-gray-900">Job</span>
              <span className="text-[#F83002] bg-red-50 px-2 py-0.5 rounded-lg">Portal</span>
            </Link>
          </h1>
        </div>

        <div className="flex items-center gap-10">
          <ul className="flex font-semibold items-center gap-8 text-gray-600">
            {user && user.role === "recruiter" ? (
              <>
                <li className="hover:text-[#6A38C2] transition-colors">
                  <Link to="/admin/companies" className="flex items-center gap-2">
                    <Building2 size={18} /> Companies
                  </Link>
                </li>
                <li className="hover:text-[#6A38C2] transition-colors">
                  <Link to="/admin/jobs" className="flex items-center gap-2">
                    <Briefcase size={18} /> Jobs
                  </Link>
                </li>
                {/* Optional: Add Contact Us for Recruiters here too if needed */}
              </>
            ) : (
              <>
                <li className="hover:text-gray-900 transition-colors">
                  <Link to="/">Home</Link>
                </li>
                <li className="hover:text-gray-900 transition-colors">
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li className="hover:text-gray-900 transition-colors">
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
            {/* Added Contact Us link for everyone */}
            <li className="hover:text-[#6A38C2] transition-colors">
              <Link to="/contact" className="flex items-center gap-2">
                Contact Us
              </Link>
            </li>
          </ul>

          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" className="font-bold hover:bg-gray-100">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5a2eb0] font-bold px-6 shadow-md shadow-purple-200 transition-all active:scale-95">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer border-2 border-transparent hover:border-purple-500 transition-all shadow-sm">
                  <AvatarImage
                    src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"}
                    alt="profile"
                  />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-80 mt-2 p-0 overflow-hidden rounded-xl shadow-2xl border-gray-100">
                <div className="bg-gray-50/50 p-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border border-white shadow-sm">
                      <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} />
                    </Avatar>
                    <div>
                      <h4 className="font-bold text-gray-900">{user?.fullname}</h4>
                      <p className="text-xs text-gray-500 line-clamp-1 italic">
                        {user?.profile?.bio || (user.role === 'recruiter' ? "Recruiter Account" : "No bio added yet")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-2 flex flex-col">
                  <Link 
                    to={user?.role === 'recruiter' ? "/admin/profile" : "/profile"} 
                    className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-purple-50 hover:text-[#6A38C2] rounded-lg transition-colors"
                  >
                    {user?.role === 'recruiter' ? <LayoutDashboard size={18} /> : <User2Icon size={18} />}
                    {user?.role === 'recruiter' ? "Manage Account" : "View Profile"}
                  </Link>

                  <button 
                    onClick={logoutHandler} 
                    className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full text-left"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;





// import React from "react";
// import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
// import { Avatar, AvatarImage } from "../ui/avatar";
// import { Button } from "@/components/ui/button";
// import { LogOut, User2Icon, Briefcase, Building2 } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "sonner";
// import { USER_API_END_POINT } from "./../../utils/constant";
// import axios from "axios";
// import { setUser } from "@/redux/authSlice";

// const Navbar = () => {
//   const { user } = useSelector((store) => store.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const logoutHandler = async () => {
//     try {
//       const res = await axios.get(`${USER_API_END_POINT}/logout`, {
//         withCredentials: true,
//       });
//       if (res.data.success) {
//         dispatch(setUser(null));
//         navigate("/");
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response?.data?.message || "Logout failed");
//     }
//   };

//   return (
//     // CHANGE: Added sticky positioning, glassmorphism (backdrop-blur), and a subtle border
//     <div className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
//       <div className="flex items-center justify-between mx-auto max-w-7xl h-20 px-4">
//         <div>
//           <h1 className="text-2xl font-extrabold tracking-tight">
//             <Link to="/" className="flex items-center gap-1">
//               <span className="text-gray-900">Job</span>
//               <span className="text-[#F83002] bg-red-50 px-2 py-0.5 rounded-lg">Portal</span>
//             </Link>
//           </h1>
//         </div>

//         <div className="flex items-center gap-10">
//           <ul className="flex font-semibold items-center gap-8 text-gray-600">
//             {user && user.role === "recruiter" ? (
//               <>
//                 <li className="hover:text-[#F83002] transition-colors">
//                   <Link to="/admin/companies" className="flex items-center gap-2">
//                     <Building2 size={18} /> Companies
//                   </Link>
//                 </li>
//                 <li className="hover:text-[#F83002] transition-colors">
//                   <Link to="/admin/jobs" className="flex items-center gap-2">
//                     <Briefcase size={18} /> Jobs
//                   </Link>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li className="hover:text-gray-900 transition-colors">
//                   <Link to="/">Home</Link>
//                 </li>
//                 <li className="hover:text-gray-900 transition-colors">
//                   <Link to="/jobs">Jobs</Link>
//                 </li>
//                 <li className="hover:text-gray-900 transition-colors">
//                   <Link to="/browse">Browse</Link>
//                 </li>
//               </>
//             )}
//           </ul>

//           {!user ? (
//             <div className="flex items-center gap-3">
//               <Link to="/login">
//                 <Button variant="ghost" className="font-bold hover:bg-gray-100">Login</Button>
//               </Link>
//               <Link to="/signup">
//                 <Button className="bg-[#6A38C2] hover:bg-[#5a2eb0] font-bold px-6 shadow-md shadow-purple-200 transition-all active:scale-95">
//                   Signup
//                 </Button>
//               </Link>
//             </div>
//           ) : (
//             <Popover>
//               <PopoverTrigger asChild>
//                 {/* CHANGE: Added a ring effect to the avatar trigger */}
//                 <Avatar className="cursor-pointer border-2 border-transparent hover:border-purple-500 transition-all shadow-sm">
//                   <AvatarImage
//                     src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"}
//                     alt="profile"
//                   />
//                 </Avatar>
//               </PopoverTrigger>

//               <PopoverContent className="w-80 mt-2 p-0 overflow-hidden rounded-xl shadow-2xl border-gray-100">
//                 {/* Header section of Popover */}
//                 <div className="bg-gray-50/50 p-4 border-b border-gray-100">
//                   <div className="flex items-center gap-3">
//                     <Avatar className="h-12 w-12 border border-white shadow-sm">
//                       <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} />
//                     </Avatar>
//                     <div>
//                       <h4 className="font-bold text-gray-900">{user?.fullname}</h4>
//                       <p className="text-xs text-gray-500 line-clamp-1 italic">
//                         {user?.profile?.bio || "No bio added yet"}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Actions section */}
//                 <div className="p-2 flex flex-col">
//                   {user && user.role === "student" && (
//                     <Link to="/profile" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
//                       <User2Icon size={18} className="text-gray-400" />
//                       View Profile
//                     </Link>
//                   )}

//                   <button 
//                     onClick={logoutHandler} 
//                     className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full text-left"
//                   >
//                     <LogOut size={18} />
//                     Logout
//                   </button>
//                 </div>
//               </PopoverContent>
//             </Popover>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

// import React from "react";
// import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
// import { Avatar, AvatarImage } from "../ui/avatar";
// import { Button } from "@/components/ui/button";
// import { LogOut, User2Icon } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "sonner";
// import { USER_API_END_POINT } from "./../../utils/constant";
// import axios from "axios";
// import { setUser } from "@/redux/authSlice";

// const Navbar = () => {
//   const { user } = useSelector((store) => store.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const logoutHandler = async () => {
//     try {
//       const res = await axios.get(`${USER_API_END_POINT}/logout`, {
//         withCredentials: true,
//       });
//       if (res.data.success) {
//         dispatch(setUser(null));
//         navigate("/");
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response.data.message);
//     }
//   };

//   return (
//     <div className="bg-white">
//       <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
//         <div>
//           <h1 className="text-2xl  font-bold">
//             <Link to="/">
//             Job<span className="text-[#F83002]">Portal</span>
//             </Link>
//           </h1>
//         </div>

//         <div className="flex items-center gap-12">
//           <ul className="flex font-medium items-center gap-5">
//             {user && user.role === "recruiter" ? (
//               <>
//                 <li>
//                   <Link to="/admin/companies">Companies</Link>
//                 </li>
//                 <li>
//                   <Link to="/admin/jobs">Jobs</Link>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li>
//                   <Link to="/">Home</Link>
//                 </li>
//                 <li>
//                   <Link to="/jobs">Jobs</Link>
//                 </li>
//                 <li>
//                   <Link to="/browse">Browse</Link>
//                 </li>
//               </>
//             )}
//           </ul>
//           {!user ? (
//             <div className="flex items-center gap-2">
//               <Link to="/login">
//                 <Button variant="outline">Login</Button>
//               </Link>
//               <Link to="/signup">
//                 <Button className="bg-[#6A38C2] hover:bg-[#6e5598]">
//                   Signup
//                 </Button>
//               </Link>
//             </div>
//           ) : (
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Avatar className="cursor-pointer">
//                   <AvatarImage
//                     src={
//                       user?.profile?.profilePhoto ||
//                       "https://cdn-icons-png.flaticon.com/512/174/174857.png"
//                     }
//                     alt="profile"
//                   />
//                 </Avatar>
//               </PopoverTrigger>

//               <PopoverContent className="">
//                 <div className="flex gap-4 space-y-2">
//                   <Avatar className="cursor-pointer">
//                     <AvatarImage
//                       src={
//                         user?.profile?.profilePhoto ||
//                         "https://cdn-icons-png.flaticon.com/512/174/174857.png"
//                       }
//                       alt="profile"
//                     />
//                   </Avatar>
//                   <div>
//                     <h4 className="font-medium ">{user?.fullname}</h4>
//                     <p className="text-sm text-muted-foreground">
//                       {user?.profile?.bio}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex flex-col my-2 text-gray-600">
//                   {user && user.role === "student" && (
//                     <div className="flex w-fit items-center gap-2 cursor-pointer">
//                       <User2Icon />
//                       <Button variant="link">
//                         <Link to="/profile">View Profile</Link>
//                       </Button>
//                     </div>
//                   )}

//                   <div className="flex w-fit items-center gap-2 cursor-pointer">
//                     <LogOut />
//                     <Button onClick={logoutHandler} variant="link">
//                       <Link to="/">Logout</Link>
//                     </Button>
//                   </div>
//                 </div>
//               </PopoverContent>
//             </Popover>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
