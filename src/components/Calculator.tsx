import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../state/store.ts';
import {increment, decrement} from '../state/calc/manageSlice.ts';

const Calculator:React.FC = ()=>{

    const counter = useSelector((state: RootState)=>state.calculator.value);
    const dispatch = useDispatch();
    return(
        <>
        <h1>({counter})</h1>
            <hr/>
            <button onClick={()=>dispatch(increment())} className='btn btn-primary btn-sm'>+</button>
            &nbsp;
            <button onClick={()=>dispatch(decrement())}  className='btn btn-success btn-sm'>-</button>
        </>
    )
};
export default Calculator; 