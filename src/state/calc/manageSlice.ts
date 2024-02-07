import {createSlice} from '@reduxjs/toolkit';

interface ManageCalcState{
    value:number;
}

const initialState:ManageCalcState={
    value:0
}

const manageSlice = createSlice({
    name:'calculator',
    initialState,
    reducers:{
        increment:(state)=>{
            state.value+=1;
        },
        decrement:(state)=>{
            state.value-=1;
        },
    }
});
export const {increment, decrement} = manageSlice.actions;
export default manageSlice.reducer;