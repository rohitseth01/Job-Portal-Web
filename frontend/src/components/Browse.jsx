import React, { useEffect } from "react";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice"; // Fixed: Capital S
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery("")); // Fixed: Capital S
    };
  }, [dispatch]);

  return (
    <section className="bg-gradient-to-b from-purple-50 to-white min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="font-black text-2xl mb-8 text-gray-900">
          Search <span className="text-[#6A38C2]">Results</span>{" "}
          <span className="text-gray-400 font-normal">({allJobs.length})</span>
        </h1>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{ minHeight: "60vh" }}
        >
          {allJobs.map((job) => (
            <Job key={job._id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Browse;
