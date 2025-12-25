import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name: 'application',
    initialState: {
        applicants: [],
        allAppliedJobs: [], // Make sure this matches your state name
    },
    reducers: {
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        }
    }
});

export const { setAllAppliedJobs } = applicationSlice.actions; // THIS MUST MATCH THE IMPORT
export default applicationSlice.reducer;