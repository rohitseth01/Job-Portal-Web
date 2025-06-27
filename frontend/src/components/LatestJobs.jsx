import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto my-16 px-4">
      {/* Optimized Heading Section */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
          <span className="text-[#6A38C2]">Latest & Top </span> 
          Job Openings
        </h1>
        <p className="text-gray-500 mt-2 font-medium">
          Discover your next career move from our top curated opportunities.
        </p>
      </div>

      {/* Optimized Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-5 items-stretch">
        {allJobs.length <= 0 ? (
          <div className="col-span-full py-10 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <span className="text-gray-500 font-semibold italic">No Job Available at the moment</span>
          </div>
        ) : (
          // Showing only the first 6 latest jobs
          allJobs?.slice(0, 6).map((job) => (
            <LatestJobCards key={job._id} job={job} />
          ))
        )}
      </div>
    </div>
  );
};

export default LatestJobs;




// import React from "react";
// import LatestJobCards from "./LatestJobCards";
// import { useSelector } from "react-redux";

// const LatestJobs = () => {
//   const {allJobs}=useSelector(store=>store.job)


//   return (
//     <div className="max-w-7xl mx-auto my-20">
//       <h1 className="text-4xl font-bold">
//         <span className="text-[#6A38C2]">Latest & Top </span>Job Openings
//       </h1>
//       {/* //multiple job cards displayy here */}
//       <div className="grid grid-cols-3 gap-4 my-5">
//         {
//           allJobs.length <= 0 ? (
//             <span>No Job Available</span>
//           ) : (
//             allJobs.slice(0, 6).map((job) => (
//               <LatestJobCards  key={job._id} job={job} />
//             ))
//           )
//         }
//       </div>
//     </div>
//   );
// };

// export default LatestJobs;
