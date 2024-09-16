import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type TCar = {
    _id: string;
    name: string;
    color: string;
    description: string;
    features: string[];
    isDeleted: boolean;
    isElectric: boolean;
    pricePerHour: number;
    status: 'available' | 'unavailable' | 'rented'; 
    createdAt: string; 
    updatedAt: string; 
    __v: number;
}


type TCarsState = {
    data : TCar[] | null,
    cars : TCar[] | null
}

// Define the initial state using that type
const initialState:TCarsState = {
    cars: [],
    data: [],
  }

  export const carSlice = createSlice({
    name:"carsSlice",
    initialState,
    reducers:{
        setCars : (state,action : PayloadAction<TCar[]>) =>{
            // console.log(action.payload);
            
            state.data = action.payload
            state.cars = action.payload
        }
    }
  })

  export const {setCars} = carSlice.actions
  export default carSlice.reducer