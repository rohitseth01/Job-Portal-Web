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
import { setLoading, setUser } from "../../redux/authSlice";
import { Loader2, LockKeyhole } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.role) return toast.error("Please select a role");

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
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
      <div className="flex items-center justify-center max-w-7xl mx-auto px-4 py-16">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-white border border-gray-100 rounded-3xl p-10 shadow-2xl shadow-purple-50"
        >
          <div className="flex items-center gap-2 mb-6">
            <LockKeyhole className="text-[#6A38C2]" />
            <h1 className="font-extrabold text-2xl text-gray-900">Login</h1>
          </div>

          <div className="space-y-5">
            <div className="flex flex-col gap-1.5">
              <Label className="font-bold text-gray-700">Email Address</Label>
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

            <div className="py-2">
              <Label className="font-bold text-gray-700 mb-3 block">Login as</Label>
              <RadioGroup className="flex items-center gap-6">
                <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl border transition-all cursor-pointer ${input.role === 'student' ? 'border-[#6A38C2] bg-purple-50' : 'border-gray-100'}`}>
                  <input
                    type="radio"
                    name="role"
                    id="student"
                    value="student"
                    checked={input.role === "student"}
                    onChange={changeEventHandler}
                    className="cursor-pointer w-4 h-4 accent-[#6A38C2]"
                  />
                  <Label htmlFor="student" className="cursor-pointer font-semibold text-gray-700">Student</Label>
                </div>
                <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl border transition-all cursor-pointer ${input.role === 'recruiter' ? 'border-[#6A38C2] bg-purple-50' : 'border-gray-100'}`}>
                  <input
                    type="radio"
                    name="role"
                    id="recruiter"
                    value="recruiter"
                    checked={input.role === "recruiter"}
                    onChange={changeEventHandler}
                    className="cursor-pointer w-4 h-4 accent-[#6A38C2]"
                  />
                  <Label htmlFor="recruiter" className="cursor-pointer font-semibold text-gray-700">Recruiter</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {loading ? (
            <Button disabled className="w-full mt-8 bg-[#6A38C2] rounded-xl py-6 font-bold shadow-lg shadow-purple-100">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Logging in...
            </Button>
          ) : (
            <Button type="submit" className="w-full mt-8 bg-[#6A38C2] hover:bg-[#5a2eb0] rounded-xl py-6 font-bold transition-all active:scale-95 shadow-lg shadow-purple-100">
              Login
            </Button>
          )}

          <div className="text-center mt-6">
            <span className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#6A38C2] font-bold hover:underline">
                Sign up
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

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
// import { setLoading, setUser } from "../../redux/authSlice";
// import { Loader2 } from "lucide-react";

// const Login = () => {
  
//   const [input, setInput] = useState({
//     email: "",
//     password: "",
//     role: "",
//   });
//   const { loading,user } = useSelector((store) => store.auth);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     try {
//       dispatch(setLoading(true));
//       const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         withCredentials: true,
//       });

//       if (res.data.success) {
//         dispatch(setUser(res.data.user))
//         navigate("/");
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response.data.message);
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   useEffect(()=>{
//     if(user){
//       navigate("/")
//     }
//   },[])

//   return (
//     <div>
//       <Navbar />
//       <div className="flex items-center justify-center max-w-7xl mx-auto ">
//         <form
//           onSubmit={submitHandler}
//           className="w-1/2 border border-gray-200 rounded-md p-4 my-10 "
//         >
//           <h1 className="font-bold text-xl mb-5">Login</h1>

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
//                   checked={input.role === "student"}
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
//                   checked={input.role === "recruiter"}
//                   onChange={changeEventHandler}
//                   className="cursor-pointer"
//                 />
//                 <Label htmlFor="r2">Recruiter</Label>
//               </div>
//             </RadioGroup>
//           </div>
//           {loading ? (
//             <Button className="w-full my-4">
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               Please Wait
//             </Button>
//           ) : (
//             <Button type="submit" className="w-full my-4">
//               Login
//             </Button>
//           )}

//           <span className="text-sm">
//             Don't have an account?{" "}
//             <Link to="/signup" className="text-blue-400">
//               Signup
//             </Link>
//           </span>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
