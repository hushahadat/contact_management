import { createSlice } from "@reduxjs/toolkit";
const initialState={
    selectedData :[],
}
 export const formData = (createSlice({
    name:"formData",
    initialState,
    reducers:{
        setSelectedData:(state,action )=>{
            state?.selectedData?.push(action.payload)
        },
        deleteSelectedData :(state,action)=>{
            state.selectedData = action.payload
        }
    }
 }))

 export const {setSelectedData,deleteSelectedData} = formData.actions
 export default formData.reducer