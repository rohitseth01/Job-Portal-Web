import React from "react";
import CategorySection from "./CategorySection";
import LatestJobs from "./LatestJobs";
import TopCompanies from "./TopCompanies";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [query, setQuery] = React.useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-purple-50 py-16 text-center border-b border-gray-100">
        <div className="flex flex-col gap-5 max-w-2xl mx-auto">
          <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium shadow-sm">
            No. 1 Job Hunt Website
          </span>
          <h1 className="text-4xl md:text-5xl font-black leading-tight">
            Search, Apply & <br /> Get Your{" "}
            <span className="text-[#6A38C2]">Dream Jobs</span>
          </h1>
          <p className="text-gray-500 font-medium">
            Connecting talent with top companies. Explore thousands of job
            opportunities across tech, design, and management.
          </p>
          <div className="flex w-full md:w-[70%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto bg-white">
            <input
              type="text"
              placeholder="Find your dream jobs"
              onChange={(e) => setQuery(e.target.value)}
              className="outline-none border-none w-full bg-transparent py-3 text-lg"
            />
            <Button
              onClick={searchJobHandler}
              className="rounded-r-full bg-[#6A38C2] hover:bg-[#4b247a] px-6 py-3 text-lg font-bold shadow-md transition-all"
            >
              <Search className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="bg-white py-12 border-b border-gray-100">
        <CategorySection />
      </section>

      {/* Latest Jobs Section */}
      <section className="bg-purple-50 py-12 border-b border-gray-100">
        <LatestJobs />
      </section>

      {/* Top Companies Section */}
      <section className="bg-white py-12">
        <TopCompanies />
      </section>
    </>
  );
};

export default Home;
