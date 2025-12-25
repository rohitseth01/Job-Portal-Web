import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name: 'application',
    initialState: {
        applicants: [],
        allAppliedJobs: [], 
    },
    reducers: {
        // This is used by the Applicants.jsx file
        setAllApplicants: (state, action) => {
            state.applicants = action.payload;
        },
        // This is used by the useGetAppliedJob hook
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        }
    }
});

// IMPORTANT: Both must be exported here for the build to succeed
export const { setAllApplicants, setAllAppliedJobs } = applicationSlice.actions;
export default applicationSlice.reducer;