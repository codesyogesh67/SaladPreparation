import { createSlice } from "@reduxjs/toolkit"

const dataSlice = createSlice({
    name: "data",
    initialState: { searchStatus: false, id: "", newData: [], dataRetreived: [], prepare: false },
    reducers: {

        getSearchStatus: (state) => {
            state.searchStatus = true
        },
        searchData: (state, action) => {
            state.dataRetreived = action.payload
        },
        postData: (state, action) => {
            const updateData = { ...action.payload, orderStatus: false }
            state.newData = updateData
        },
        cancelSearchData: (state, action) => {

            state.searchStatus = false
            state.dataRetreived = []
        },
        prepareStatus: (state, action) => {
            state.prepare = action.payload;
        },
        postId: (state, action) => {
            state.id = action.payload;
        }


    }
})

export const selectSearchStatus = (state) => state.data.searchStatus;
export const selectData = (state) => state.data.dataRetreived;
export const selectId = state => state.data.id;
export const selectNewData = (state) => state.data.newData;
export const selectPrepareStatus = (state) => state.data.prepare;
export const { getSearchStatus, postId, cancelSearchData, postData, searchData, prepareStatus } = dataSlice.actions;

export default dataSlice.reducer;