import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { motion, AnimatePresence } from "framer-motion";

const getSalaryRange = (label) => {
  switch (label) {
    case "0-6 lakh":
      return [0, 6];
    case "6-12 lakh":
      return [6, 12];
    case "12-18 lakh":
      return [12, 18];
    case "18-24 lakh":
      return [18, 24];
    case "24 lakh above":
      return [24, Infinity];
    default:
      return null;
  }
};

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState([]);

  useEffect(() => {
    if (!allJobs) {
      setFilterJobs([]);
      return;
    }

    if (!searchedQuery || searchedQuery === "") {
      setFilterJobs(allJobs);
      return;
    }

    const sq = searchedQuery;
    const isSalaryLabel =
      typeof sq === "string" && sq.toLowerCase().includes("lakh");

    if (isSalaryLabel) {
      const range = getSalaryRange(sq);
      if (range) {
        const [min, max] = range;
        const arr = allJobs.filter((job) => {
          if (typeof job.salary !== "number") return false;
          return job.salary >= min && job.salary <= max;
        });
        setFilterJobs(arr);
        return;
      }
      setFilterJobs(allJobs);
      return;
    }

    const qLower = sq.toLowerCase();
    const arr = allJobs.filter((job) => {
      const titleMatch = job.title?.toLowerCase().includes(qLower);
      const descMatch = job.description?.toLowerCase().includes(qLower);
      const locMatch = job.location?.toLowerCase().includes(qLower);
      return titleMatch || descMatch || locMatch;
    });
    setFilterJobs(arr);
  }, [allJobs, searchedQuery]);

  return (
    <section className="bg-gradient-to-b from-purple-50 to-white min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="font-black text-2xl mb-8 text-gray-900">
          Browse <span className="text-[#6A38C2]">Jobs</span>
        </h1>
        <div className="flex flex-col md:flex-row gap-10">
          {/* Sidebar Filter */}
          <aside className="w-full md:w-1/4 lg:w-1/5 mb-8 md:mb-0">
            <div className="md:sticky md:top-28 bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <FilterCard />
            </div>
          </aside>

          {/* Job List Grid */}
          <main className="flex-1 pb-10">
            {filterJobs.length <= 0 ? (
              <div className="flex flex-col items-center justify-center h-[60vh] text-center bg-white rounded-2xl border border-dashed border-gray-300 shadow-sm">
                <p className="text-xl font-bold text-gray-800">No Jobs Found</p>
              </div>
            ) : (
              <AnimatePresence>
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                  style={{ minHeight: "60vh" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {filterJobs.map((job) => (
                    <Job key={job._id} job={job} />
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
          </main>
        </div>
      </div>
    </section>
  );
};

export default Jobs;

{
  /* // import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import FilterCard from "./FilterCard";
// import Job from "./Job";
// import Navbar from "./shared/Navbar";
// import { motion } from "framer-motion";

// const getSalaryRange = (label) => { */
}
{
  /* //   switch (label) { */
}
//     case "0-6 lakh":       return [0, 6];
//     case "6-12 lakh":      return [6, 12];
//     case "12-18 lakh":     return [12, 18];
//     case "18-24 lakh":     return [18, 24];
//     case "24 lakh above":  return [24, Infinity];
//     default:               return null;
//   }
// };

// const Jobs = () => {
//   const { allJobs, searchedQuery } = useSelector((store) => store.job);
//   const [filterJobs, setFilterJobs] = useState([]);

//   useEffect(() => {
//     // Whenever allJobs or searchedQuery changes, recalc filterJobs
//     if (!allJobs) {
//       setFilterJobs([]);
//       return;
//     }

//     // If no filter selected, show all
//     if (!searchedQuery || searchedQuery === "") {
//       setFilterJobs(allJobs);
//       return;
//     }

//     // Otherwise, filter based on whether it's a salary-label or string-match
//     const sq = searchedQuery; // string from FilterCard

//     const isSalaryLabel = typeof sq === "string" && sq.toLowerCase().includes("lakh");
//     if (isSalaryLabel) {
//       const range = getSalaryRange(sq);
//       if (range) {
//         const [min, max] = range;
//         // filter numeric job.salary (assumed stored as a Number in LPA)
//         const arr = allJobs.filter((job) => {
//           // ensure job.salary exists and is a number
//           if (typeof job.salary !== "number") return false;
//           return job.salary >= min && job.salary <= max;
//         });
//         setFilterJobs(arr);
//         return;
//       }
//       // if salary label not recognized, fallback to all:
//       setFilterJobs(allJobs);
//       return;
//     }

//     // Not a salary filter => treat as string filter on title, description, location, etc.
//     // Convert query to lower once
//     const qLower = sq.toLowerCase();
//     const arr = allJobs.filter((job) => {
//       // title match
//       const titleMatch = job.title?.toLowerCase().includes(qLower);

//       // description match
//       const descMatch = job.description?.toLowerCase().includes(qLower);

//       // location match
//       const locMatch = job.location?.toLowerCase().includes(qLower);

//       // If you have an industry field in job, e.g. job.industry:
//       // const industryMatch = job.industry?.toLowerCase().includes(qLower);
//       // return titleMatch || descMatch || locMatch || industryMatch;

//       return titleMatch || descMatch || locMatch;
//     });
//     setFilterJobs(arr);
//   }, [allJobs, searchedQuery]);

//   return (
//     <>
//       <Navbar />

//       <div className="max-w-7xl mx-auto mt-5">
//         <div className="flex gap-5">
//           {/* Sidebar filters */}
//           <div className="w-[20%]">
//             <FilterCard />
//           </div>

//           {/* Job list */}
//           <div className="w-[80%]">
//             {filterJobs.length <= 0 ? (
//               <span>Job not found</span>
//             ) : (
//               <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
//                 <div className="grid grid-cols-3 gap-4">
//                   {filterJobs.map((jobItem) => (
//                     <motion.div
//                       initial={{ opacity: 0, x: 100 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       exit={{ opacity: 0, x: -100 }}
//                       transition={{ duration: 0.3 }}
//                       key={jobItem._id}
//                     >
//                       <Job job={jobItem} />
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Jobs;

// import { useSelector } from "react-redux";
// import FilterCard from "./FilterCard";
// import Job from "./Job";

// import Navbar from "./shared/Navbar";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// // const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

// const Jobs = () => {
//   const { allJobs, searchedQuery } = useSelector((store) => store.job);
//   const [filterJobs, setFilterJobs] = useState(allJobs);

//   useEffect(() => {
//     if (searchedQuery) {
//       const filteredJobs = allJobs.filter((job) => {
//         return (
//           job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
//           job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
//           job.location.toLowerCase().includes(searchedQuery.toLowerCase())
//         );
//       });
//       setFilterJobs(filteredJobs);
//     } else {
//       setFilterJobs(allJobs);
//     }
//   }, [allJobs, searchedQuery]);
//   return (
//     <>
//       <div>
//         <Navbar />

//         <div className="max-w-7xl mx-auto mt-5">
//           <div className="flex gap-5">
//             <div className="w-20%">
//               <FilterCard />
//             </div>
//             <div className="w-[80%]">
//               {filterJobs.length <= 0 ? (
//                 <span>Job not found</span>
//               ) : (
//                 <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
//                   <div className="grid grid-cols-3 gap-4">
//                     {filterJobs.map((job) => (
//                       <motion.div
//                         initial={{ opacity: 0, x: 100 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         exit={{ opacity: 0, x: -100 }}
//                         transition={{ duration: 0.3 }}
//                         key={job?._id}
//                       >
//                         <Job job={job} />
//                       </motion.div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Jobs;
