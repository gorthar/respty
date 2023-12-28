import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppUser } from "../../app/types/user";
import { User } from "firebase/auth";


type State = {
   authanticated : boolean;
   currentUser : AppUser | null; 
   

}

const initialState : State = {
    authanticated : false,
    currentUser : null,
    
}

export const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        login : {
            reducer:(state,action: PayloadAction<AppUser>) => {
                state.authanticated = true;
                state.currentUser = action.payload;
        } ,
        prepare : (user:User) => {
            const mapedUser : AppUser = {
                uid : user.uid,
                displayName : user.displayName,
                photoURL : user.photoURL ?? "/user.png",
                email : user.email,
                providerId : user.providerData[0].providerId    
            }
            return {payload : mapedUser}
        },
    },
        logout : (state) => {
            state.authanticated = false;
            state.currentUser = null;
        }
    }
})
export const {login,logout} = authSlice.actions;
