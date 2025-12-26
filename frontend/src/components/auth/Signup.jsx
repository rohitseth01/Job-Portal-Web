import React, { useEffect, useState } from "react";
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
  const { loading, user } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // Client-side validation for all fields
    if (!input.fullname.trim()) return toast.error("Full name is required");
    if (!input.email.trim()) return toast.error("Email is required");
    if (!input.phoneNumber.trim())
      return toast.error("Phone number is required");
    if (!input.password.trim()) return toast.error("Password is required");
    if (!input.role) return toast.error("Please select a role");
    if (!input.file) return toast.error("Please upload an avatar");

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    formData.append("file", input.file);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
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
    // Always reset loading to false on mount to prevent stuck spinner
    dispatch(setLoading(false));
    if (user) navigate("/");
  }, [user, navigate, dispatch]);

  return (
    <section className="bg-gradient-to-b from-white to-purple-50 min-h-screen flex items-center justify-center py-12">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-md bg-white border border-gray-100 rounded-3xl p-10 shadow-2xl shadow-purple-100"
      >
        <div className="flex items-center gap-2 mb-8">
          <UserPlus className="text-[#6A38C2] text-3xl" />
          <h1 className="font-extrabold text-3xl text-gray-900 tracking-tight">
            Signup
          </h1>
        </div>
        <div className="space-y-6">
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
          {/* Role selection */}
          <div className="flex items-center gap-6 py-2">
            <Label className="font-bold text-gray-700 mb-0">Role:</Label>
            <RadioGroup className="flex items-center gap-6">
              <div
                className={`flex items-center space-x-2 px-3 py-1 rounded-lg border transition-all ${
                  input.role === "student"
                    ? "border-[#6A38C2] bg-purple-50"
                    : "border-gray-200"
                }`}
              >
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer w-4 h-4 accent-[#6A38C2]"
                />
                <Label className="cursor-pointer font-medium text-gray-700">
                  Student
                </Label>
              </div>
              <div
                className={`flex items-center space-x-2 px-3 py-1 rounded-lg border transition-all ${
                  input.role === "recruiter"
                    ? "border-[#6A38C2] bg-purple-50"
                    : "border-gray-200"
                }`}
              >
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer w-4 h-4 accent-[#6A38C2]"
                />
                <Label className="cursor-pointer font-medium text-gray-700">
                  Recruiter
                </Label>
              </div>
            </RadioGroup>
          </div>
          {/* Avatar upload */}
          <div className="flex flex-col gap-1.5">
            <Label className="font-bold text-gray-700">Avatar</Label>
            <Input
              accept="image/*"
              type="file"
              onChange={changeFileHandler}
              required
              className="cursor-pointer text-xs w-40 file:mr-2 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:bg-purple-50 file:text-[#6A38C2]"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#6A38C2] hover:bg-[#4b247a] font-bold py-3 rounded-xl mt-6"
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin mr-2" /> : "Signup"}
          </Button>
          <div className="text-center">
            <span className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#6A38C2] font-bold hover:underline"
              >
                Login
              </Link>
            </span>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Signup;
