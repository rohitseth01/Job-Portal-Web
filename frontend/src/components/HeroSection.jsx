import { Search } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice"; // Import is correct (Capital S)
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    if (query.trim()) {
      // FIXED BELOW: Must match the import name exactly (Capital S)
      dispatch(setSearchedQuery(query));
      navigate("/browse");
    }
  };

  return (
    <div className="text-center bg-white">
      <div className="flex flex-col gap-5 pt-12 pb-4 md:pt-16 md:pb-6">
        <span className="mx-auto px-4 py-1 rounded-full bg-gray-50 text-[#F83002] font-semibold text-xs border border-gray-100">
          No. 1 Job Hunt Website
        </span>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
          Search, Apply & <br />
          Get Your <span className="text-[#6A38C2]">Dream Jobs</span>
        </h1>

        <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto px-4">
          Connecting talent with top companies. Explore thousands of job
          opportunities across tech, design, and management.
        </p>

        <div className="flex w-[92%] md:w-full max-w-xl mt-2 h-12 bg-white shadow-xl shadow-purple-50 border border-gray-100 pl-5 rounded-full items-center gap-2 mx-auto focus-within:border-purple-300 transition-all">
          <input
            type="text"
            placeholder="Job title, keywords or company..."
            value={query} // It's better to add value={query} for controlled components
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchJobHandler()}
            className="outline-none border-none w-full text-sm font-medium text-gray-700"
          />
          <Button
            onClick={searchJobHandler}
            className="h-full rounded-r-full bg-[#6A38C2] hover:bg-[#5a2eb0] px-4 md:px-6 transition-transform active:scale-95"
          >
            <Search className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline text-xs font-bold">Search</span>
          </Button>
        </div>

        <div className="flex items-center justify-center gap-2 mt-2 text-[10px] text-gray-400 font-medium">
          <span>Trending:</span>
          <span className="hover:text-[#6A38C2] cursor-pointer">Frontend</span>
          <span className="hover:text-[#6A38C2] cursor-pointer">Backend</span>
          <span className="hover:text-[#6A38C2] cursor-pointer">
            Data Science
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
