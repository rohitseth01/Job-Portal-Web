import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setsearchedQuery } from "../redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Banglore", "Hyderbad", "Pune", "Mumbai", "Gurgram"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "FullStack Developer",
      "Software Engineer",
      "Data Scientist",
    ],
  },
  {
    filterType: "Salary",
    array: ["0-6 lakh", "6-12 lakh", "12-18 lakh", "18-24 lakh", "24 lakh above"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setsearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    // OPTIMIZED: Modern card styling with better padding and borders
    <div className="w-full bg-white p-5 rounded-2xl shadow-lg border border-gray-100">
      <div className="flex items-center justify-between">
        <h1 className="font-extrabold text-xl text-gray-900">Filter Jobs</h1>
        {selectedValue && (
          <button 
            onClick={() => setSelectedValue("")}
            className="text-xs text-[#6A38C2] font-bold hover:underline"
          >
            Clear All
          </button>
        )}
      </div>
      <hr className="mt-3 mb-5 border-gray-100" />
      
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div key={index} className="mb-6">
            {/* Category Title */}
            <h1 className="font-bold text-base text-gray-800 mb-3">{data.filterType}</h1>
            
            <div className="space-y-2">
              {data.array.map((item, idx) => {
                const itemId = `r${index}-${idx}`;
                return (
                  <div 
                    key={itemId} 
                    className="flex items-center space-x-3 group cursor-pointer"
                  >
                    <RadioGroupItem 
                      id={itemId} 
                      value={item} 
                      className="border-gray-300 text-[#6A38C2] focus:ring-[#6A38C2]"
                    />
                    <Label 
                      htmlFor={itemId} 
                      className="text-sm font-medium text-gray-600 group-hover:text-[#6A38C2] cursor-pointer transition-colors"
                    >
                      {item}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;

// import React, { useEffect, useState } from 'react'
// import { RadioGroup, RadioGroupItem } from './ui/radio-group'
// import { Label } from './ui/label'
// import { useDispatch } from 'react-redux'
// import { setsearchedQuery } from '../redux/jobSlice'

// const filterData=[
//   {
//     filterType:"Location",
//     array:["Delhi NCR","Banglore","Hyderbad","Pune","Mumbai","Gurgram"]
//   },
//   {
//     filterType:"Industry",
//     array:["Frontend Developer","Backend Developer","FullStack Developer","Software Engineer","Data Scientist"]
//   },
//   {
//     filterType:"Salary",
//     array:["0-6 lakh","6-12 lakh","12-18 lakh","18-24 lakh","24 lakh above"]
//   }
// ]

// const FilterCard = () => {

//   const [selectedValue,setSelectedValue]=useState('');
//   const dispatch=useDispatch();

//   const changeHandler=(value)=>{
//     setSelectedValue(value)
//   }
//   useEffect(()=>{
//     dispatch(setsearchedQuery(selectedValue))
//   },[selectedValue])


//   return (
//     <div className='w-full bg-white p-3 rounded-md'> 
//       <h1 className='font-bold text-lg'>Filter Jobs</h1>
//       <hr  className='mt-3'/>
//       <RadioGroup value={selectedValue} onValueChange={changeHandler}>
//         {
//           filterData.map((data,index)=>(
//             <div>
//               <h1 className='font-bold text-lg'>{data.filterType}</h1>
//               {
//                 data.array.map((item,idx)=>{
//                   const itemId=`r${index}-${idx}`
//                   return (
//                     <div className='flex  items-center space-x-2 my-2'>
//                       <RadioGroupItem id={itemId} value={item} />
//                       <Label htmlFor={itemId}>{item}</Label>
//                     </div>
//                   )
//                 })
//               }
//             </div>
//           ))
//         }
//       </RadioGroup>




//     </div>
//   )
// }

// export default FilterCard