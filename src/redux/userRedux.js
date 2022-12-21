import {createSlice} from "@reduxjs/toolkit"



const initialState =  {
    userId: "",
    username:"",
    accessToken: "",
    isAdmin: false,
    isLoggedIn: false
}



const userSlice = createSlice({
    name: "user",
    initialState:  {
        userId: "",
        username:"",
        accessToken: "",
        isAdmin: false,
        isLoggedIn: false
    },
    reducers : {
        saveUser: (state, action)=>{
            const newState = {
                isLoggedIn : true,
                ...action.payload
            }
            return newState
        },
        removeUser : (state, action)=>{
           return initialState
        }
    }
})


export const {saveUser} = userSlice.actions 
export const {removeUser} = userSlice.actions

export default userSlice.reducer


