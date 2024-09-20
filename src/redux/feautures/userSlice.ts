import { TUser } from "@/types/allTyps"
import { createSlice } from "@reduxjs/toolkit"
 
type TInitialState = {
    user: TUser | null,
    token:string | null,
    loading:boolean
}

const  initialState:TInitialState = {
    user: null,
    token:null,
    loading:true
}

export const  userSlice = createSlice({
    name:'user',
    initialState,
    reducers:({
        setUser : (state, action) =>{
            state.user = action.payload
        },
        removeUser : (state) =>{
            state.user = null
        },
        setToken : (state, action) =>{
            state.token = action.payload
        },
        removeToken : (state) =>{
            state.token = null
        },
        setLoading : (state, action) =>{
            state.loading = action.payload
        },
    })
})


export const {setUser, removeUser, setToken, removeToken, setLoading} = userSlice.actions
export default userSlice.reducer