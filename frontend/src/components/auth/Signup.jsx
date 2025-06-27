import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { RadioGroup } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import { Loader2, UserPlus } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector(store => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.role) return toast.error("Please select a role");

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto px-4 py-12">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-lg bg-white border border-gray-100 rounded-3xl p-10 shadow-2xl shadow-purple-50"
        >
          <div className="flex items-center gap-2 mb-6">
             <UserPlus className="text-[#6A38C2]" />
             <h1 className="font-extrabold text-2xl text-gray-900">Create Account</h1>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <Label className="font-bold text-gray-700">Full Name</Label>
              <Input
                type="text"
                value={input.fullname}
                name="fullname"
                onChange={changeEventHandler}
                placeholder="John Doe"
                className="rounded-xl border-gray-200 focus:ring-2 focus:ring-purple-100 focus:border-[#6A38C2] transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="font-bold text-gray-700">Email</Label>
              <Input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="john@example.com"
                className="rounded-xl border-gray-200 focus:ring-2 focus:ring-purple-100 focus:border-[#6A38C2] transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="font-bold text-gray-700">Phone Number</Label>
              <Input
                type="text"
                value={input.phoneNumber}
                name="phoneNumber"
                onChange={changeEventHandler}
                placeholder="9876543210"
                className="rounded-xl border-gray-200 focus:ring-2 focus:ring-purple-100 focus:border-[#6A38C2] transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="font-bold text-gray-700">Password</Label>
              <Input
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="••••••••"
                className="rounded-xl border-gray-200 focus:ring-2 focus:ring-purple-100 focus:border-[#6A38C2] transition-all"
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <RadioGroup className="flex items-center gap-6">
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-lg border transition-all ${input.role === 'student' ? 'border-[#6A38C2] bg-purple-50' : 'border-transparent'}`}>
                  <Input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === 'student'}
                    onChange={changeEventHandler}
                    className="cursor-pointer w-4 h-4 text-[#6A38C2] accent-[#6A38C2]"
                  />
                  <Label className="cursor-pointer font-medium text-gray-700">Student</Label>
                </div>
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-lg border transition-all ${input.role === 'recruiter' ? 'border-[#6A38C2] bg-purple-50' : 'border-transparent'}`}>
                  <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === 'recruiter'}
                    onChange={changeEventHandler}
                    className="cursor-pointer w-4 h-4 text-[#6A38C2] accent-[#6A38C2]"
                  />
                  <Label className="cursor-pointer font-medium text-gray-700">Recruiter</Label>
                </div>
              </RadioGroup>

              <div className="flex flex-col gap-1.5">
                <Label className="font-bold text-gray-700">Avatar</Label>
                <Input
                  accept="image/*"
                  type="file"
                  onChange={changeFileHandler}
                  className="cursor-pointer text-xs w-40 file:mr-2 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:bg-purple-50 file:text-[#6A38C2]"
                />
              </div>
            </div>
          </div>

          {loading ? (
            <Button disabled className="w-full my-6 bg-[#6A38C2] rounded-xl py-6 font-bold">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Creating Account...
            </Button>
          ) : (
            <Button type="submit" className="w-full my-6 bg-[#6A38C2] hover:bg-[#5a2eb0] rounded-xl py-6 font-bold transition-all active:scale-95 shadow-lg shadow-purple-100">
              Sign Up
            </Button>
          )}
          
          <div className="text-center">
            <span className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-[#6A38C2] font-bold hover:underline">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;


// import React, { useEffect, useState } from "react";
// import Navbar from "../shared/Navbar";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
// import { RadioGroup } from "../ui/radio-group";
// import { Link, useNavigate } from "react-router-dom";
// import { USER_API_END_POINT } from "../../utils/constant";
// import { toast } from "sonner";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { setLoading } from "../../redux/authSlice";
// import { Loader2 } from "lucide-react";

// const Signup = () => {

//   const [input, setInput] = useState({
//     fullname: "",
//     email: "",
//     phoneNumber: "",
//     password: "",
//     role: "",
//     file: "",
//   });
//   const navigate=useNavigate();
//   const dispatch=useDispatch()
//   const {loading,user}=useSelector(store=>store.auth);

//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const changeFileHandler = (e) => {
//     setInput({ ...input, file: e.target.files?.[0] });
//   };

//   const submitHandler=async(e)=>{
//     e.preventDefault();

//     const formData=new FormData()
//     formData.append("fullname",input.fullname);
//     formData.append("email",input.email);
//     formData.append("phoneNumber",input.phoneNumber);
//     formData.append("password",input.password);
//     formData.append("role",input.role);

//     if(input.file){
//       formData.append("file",input.file);
//     }

//     try {
//       dispatch(setLoading(true))
//       const res=await axios.post(`${USER_API_END_POINT}/register`,formData,{
//         headers:{
//           "Content-Type":"multipart/form-data"
//         },
//         withCredentials:true
//       })

//       if(res.data.success){
//         navigate("/login")
//         toast.success(res.data.message);
//       }

//     } catch (error) {
//       console.log(error);
//       toast.error(error.response.data.message);
      
//     }finally{
//       dispatch(setLoading(false))
//     }
    
//   }

//    useEffect(()=>{
//       if(user){
//         navigate("/")
//       }
//     },[])

//   return (
//     <div>
//       <Navbar />
//       <div className="flex items-center justify-center max-w-7xl mx-auto ">
//         <form
//           onSubmit={submitHandler}
//           className="w-1/2 border border-gray-200 rounded-md p-4 my-10 "
//         >
//           <h1 className="font-bold text-xl mb-5">Sign up</h1>
//           <div className="my-2">
//             <Label>Full Name</Label>
//             <Input
//               type="text"
//               value={input.fullname}
//               name="fullname"
//               onChange={changeEventHandler}
//               placeholder="xyz"
//             />
//           </div>
//           <div className="my-2">
//             <Label>Email</Label>
//             <Input
//               type="email"
//               value={input.email}
//               name="email"
//               onChange={changeEventHandler}
//               placeholder="xyz@gmail.com"
//             />
//           </div>
//           <div className="my-2">
//             <Label>Phone Number</Label>
//             <Input
//               type="text"
//               value={input.phoneNumber}
//               name="phoneNumber"
//               onChange={changeEventHandler}
//               placeholder="9191919191"
//             />
//           </div>
//           <div className="my-2">
//             <Label>Password</Label>
//             <Input
//               type="password"
//               value={input.password}
//               name="password"
//               onChange={changeEventHandler}
//               placeholder="xyz@123"
//             />
//           </div>

//           <div className="flex items-center justify-between">
//             <RadioGroup className="flex  items-center gap-4 my-5">
//               <div className="flex items-center space-x-2">
//                 <Input
//                   type="radio"
//                   name="role"
//                   value="student"
//                   checked={input.role==='student'}
//                   onChange={changeEventHandler}
//                   className="cursor-pointer"
//                 />
//                 <Label htmlFor="r1">Student</Label>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Input
//                   type="radio"
//                   name="role"
//                   value="recruiter"
//                   checked={input.role==='recruiter'}
//                   onChange={changeEventHandler}
//                   className="cursor-pointer"
//                 />
//                 <Label htmlFor="r2">Recruiter</Label>
//               </div>
//             </RadioGroup>

//             <div className="flex items-center gap-2">
//               <Label>Profile</Label>
//               <Input
//               accept="image/*"
//               type="file" 
//               onChange={changeFileHandler}
//               className="cursor-pointer" />
//             </div>
//           </div>

//           {loading ? (
//             <Button className="w-full my-4">
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               Please Wait
//             </Button>
//           ) : (
//             <Button type="submit" className="w-full my-4">
//               Signup
//             </Button>
//           )}
//           <span className="text-sm">
//             Already have an account?{" "}
//             <Link to="/login" className="text-blue-400">
//               Login
//             </Link>
//           </span>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;
