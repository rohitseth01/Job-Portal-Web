import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        allAdminJobs: [],
        singleJob: null, 
        searchJobByText: "",
        allAppliedJobs: [],
        searchedQuery: "", // Capital Q here
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery: (state, action) => { // Capital S here
            state.searchedQuery = action.payload;
        }
    }
});

export const { 
    setAllJobs, 
    setSingleJob, 
    setAllAdminJobs, 
    setSearchJobByText, 
    setAllAppliedJobs, 
    setSearchedQuery // Capital S here
} = jobSlice.actions;
export default jobSlice.reducer;