import { createSlice } from "@reduxjs/toolkit";
import{user} from "../../app/types/User"

type State = {
   authanticated : boolean;
   currentUser : user | null; 
   

}

const initialState : State = {
    authanticated : false,
    currentUser : null,
    
}

export const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        login : (state,action) => {
            state.authanticated = true;
            state.currentUser ={
                //id : action.payload.id,
                name : "bob",
                photoURL : "/user.png",
                password : "",
                email : action.payload.email,
            
            };
        },
        logout : (state) => {
            state.authanticated = false;
            state.currentUser = null;
        }
    }
})
export const {login,logout} = authSlice.actions;