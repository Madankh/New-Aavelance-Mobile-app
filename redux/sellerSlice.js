import { createSlice } from "@reduxjs/toolkit";

const sellerSlice = createSlice({
    name: "seller",
    initialState: {
        currentSeller: null,
        isFetching: false,
        error: false,
    },
    reducers:{
        sellerloginStart:(state)=>{
            state.isFetching = true;
        },
        sellerloginSuccess: (state , action)=>{
            state.isFetching = false;
            state.currentSeller = action.payload;
        },
        sellerloginFailure: (state , action)=>{
            state.isFetching = false;
            state.error = action.payload
        },
        sellerLogout: (state)=>{
            state.currentSeller = null;
            state.error =  null;
        },
    },
});

export const {sellerloginStart , sellerloginSuccess , sellerloginFailure , sellerLogout} = sellerSlice.actions;
export default sellerSlice.reducer;