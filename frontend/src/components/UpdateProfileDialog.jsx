import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "../utils/constant";
import { setUser } from "../redux/authSlice";
import { toast } from "sonner";
import axios from "axios";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  // Initialize state with current user data
  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const resumeFileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setResumeFile(file);
  };

  const profilePhotoFileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setProfilePhotoFile(file);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);

    // Only append skills if the user is a student
    if (user?.role !== "recruiter") {
      formData.append("skills", input.skills);
    }

    if (resumeFile) {
      formData.append("resume", resumeFile);
    }
    if (profilePhotoFile) {
      formData.append("profilePhoto", profilePhotoFile);
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      let msg = "Something went wrong";
      if (error.response?.data?.message) {
        msg = error.response.data.message;
        if (error.response.data.error) {
          msg += ": " + error.response.data.error;
        }
      }
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;
  return ReactDOM.createPortal(
    <Dialog open={open}>
      <DialogContent
        className="sm:max-w-[450px] rounded-3xl border-none shadow-2xl p-8"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-gray-900 tracking-tight">
            Update Profile
          </DialogTitle>
          <p className="text-sm text-gray-500 font-medium">
            Refine your professional identity here.
          </p>
        </DialogHeader>

        <form onSubmit={submitHandler} className="space-y-5 mt-4">
          {/* Common Fields: Name, Email, Phone */}
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="fullname"
              className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1"
            >
              Full Name
            </Label>
            <Input
              id="fullname"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              className="rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-purple-100 transition-all font-medium py-6"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="email"
              className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1"
            >
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              className="rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-purple-100 transition-all font-medium py-6"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="phoneNumber"
              className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1"
            >
              Phone Number
            </Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              className="rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-purple-100 transition-all font-medium py-6"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="bio"
              className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1"
            >
              Bio / Headline
            </Label>
            <Input
              id="bio"
              name="bio"
              value={input.bio}
              onChange={changeEventHandler}
              placeholder={
                user?.role === "recruiter"
                  ? "Expert Tech Recruiter"
                  : "Passionate Frontend Developer"
              }
              className="rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-purple-100 transition-all font-medium py-6"
            />
          </div>

          {/* ROLE SPECIFIC FIELDS: Only for Students */}
          {user?.role !== "recruiter" && (
            <>
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="skills"
                  className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1"
                >
                  Technical Skills
                </Label>
                <Input
                  id="skills"
                  name="skills"
                  value={input.skills}
                  onChange={changeEventHandler}
                  placeholder="React, Node, Python..."
                  className="rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-purple-100 transition-all font-medium py-6"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="resumeFile"
                  className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1"
                >
                  Resume (PDF)
                </Label>
                <Input
                  id="resumeFile"
                  name="resumeFile"
                  type="file"
                  onChange={resumeFileChangeHandler}
                  accept="application/pdf"
                  className="cursor-pointer file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-purple-50 file:text-[#6A38C2] hover:file:bg-purple-100 h-12 pt-2"
                />
              </div>
            </>
          )}

          {/* Profile Photo: For both roles */}
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="profilePhotoFile"
              className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1"
            >
              Profile Picture
            </Label>
            <Input
              id="profilePhotoFile"
              name="profilePhotoFile"
              type="file"
              onChange={profilePhotoFileChangeHandler}
              accept="image/*"
              className="cursor-pointer file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-purple-50 file:text-[#6A38C2] hover:file:bg-purple-100 h-12 pt-2"
            />
          </div>

          <DialogFooter className="pt-4">
            {loading ? (
              <Button
                disabled
                className="w-full bg-[#6A38C2] rounded-xl font-bold py-7"
              >
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing Update...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-[#6A38C2] hover:bg-[#5a2eb0] rounded-xl font-black py-7 text-white tracking-wide transition-all active:scale-95 shadow-xl shadow-purple-100"
              >
                Apply Changes
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>,
    document.body
  );
};

export default UpdateProfileDialog;

// import React, { useState } from "react";
// import { Dialog, DialogFooter, DialogHeader , DialogContent, DialogTitle } from "./ui/dialog";

// import { Label } from "./ui/label";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";
// import { Loader2 } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { USER_API_END_POINT } from "../utils/constant";
// import { setUser } from "../redux/authSlice";
// import { toast } from "sonner";
// import axios from "axios";

// const UpdateProfileDialog = ({ open, setOpen }) => {
//   const [loading, setLoading] = useState(false);
//   const {user}=useSelector(store=>store.auth)

//   const [input,setInput]=useState({
//     fullname:user?.fullname,
//     email:user?.email,
//     phoneNumber:user?.phoneNumber,
//     bio:user?.profile?.bio,
//     // skills:user?.profile?.skills?.map(skill=>skill),
//     skills: user?.profile?.skills?.join(", ") || "",
//     file:user?.profile?.resume
//   });

//   const dispatach=useDispatch();

//   const changeEventHandler=(e)=>{
//     setInput({...input,[e.target.name]:e.target.value})
//   }

//   const fileChangeHandler=(e)=>{
//     const file=e.target.files?.[0];
//     setInput({...input,file})
//   }

//   const submitHandler=async(e)=>{
//     e.preventDefault();
//     const formData=new FormData();
//     formData.append("fullname",input.fullname)
//     formData.append("email",input.email)
//     formData.append("phoneNumber",input.phoneNumber)
//     formData.append("bio",input.bio)
//     formData.append("skills", input.skills);

//     if(input.file){
//         formData.append("file",input.file)

//     }

//     try {
//       setLoading(true)
//         const res=await axios.post(`${USER_API_END_POINT}/profile/update`,formData,{
//             headers:{
//                 'Content-Type':'multipart/form-data'
//             },
//             withCredentials:true
//         })
//         if(res.data.success){
//             dispatach(setUser(res.data.user))
//             toast.success(res.data.message)
//         }
//     } catch (error) {
//         console.log(error);
//         toast.error(error.response.data.message)

//     }
//     finally{
//           setLoading(false)
//     }
//     setOpen(false)
//     console.log(input);

//   }

//   return (
//     <div>
//       <Dialog open={open}>
//         <DialogContent
//           className="sm:max-w-[425px]"
//           onInteractOutside={() => setOpen(false)}
//         >
//           <DialogHeader>
//             <DialogTitle>Update Profile</DialogTitle>
//           </DialogHeader>
//           <form onSubmit={submitHandler}>
//             <div className="grid gap-4 py-4">
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="name" className="text-right">
//                   Name
//                 </Label>
//                 <Input id="name" type="text" value={input.fullname} onChange={changeEventHandler} name="fullname" className="col-span-3" />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="email" className="text-right">
//                   Email
//                 </Label>
//                 <Input id="email" type="email" value={input.email} onChange={changeEventHandler} name="email" className="col-span-3" />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="number" className="text-right">
//                   Number
//                 </Label>
//                 <Input id="number" value={input.phoneNumber} name="phoneNumber" onChange={changeEventHandler} className="col-span-3" />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="bio" className="text-right">
//                   Bio
//                 </Label>
//                 <Input id="bio" value={input.bio} name="bio" onChange={changeEventHandler} className="col-span-3" />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="skills" className="text-right">
//                   Skills
//                 </Label>
//                 <Input id="skills" value={input.skills} name="skills" onChange={changeEventHandler} className="col-span-3" />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="file" className="text-right">
//                   Resume
//                 </Label>
//                 <Input
//                   id="file"
//                   name="file"
//                   type="file"
//                   onChange={fileChangeHandler}
//                   accept="application/pdf"
//                   className="col-span-3"
//                 />
//               </div>
//             </div>
//             <DialogFooter>
//               {loading ? (
//                 <Button className="w-full my-4">
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Please Wait
//                 </Button>
//               ) : (
//                 <Button type="submit" className="w-full my-4">
//                   Update
//                 </Button>
//               )}
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default UpdateProfileDialog;
