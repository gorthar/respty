import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { testSlice } from "../scratch/testSlice";
import { eventSlice } from "./eventSlice";
import { modalSlice } from "../joint_graund/modals/modalSlice";
import { authSlice } from "../../features/auth/authSlice";
import { profileSlice } from "../../features/profiles/profileSlice";
import { photoSlice } from "../../features/profiles/photoSlice";

export const store = configureStore({
    reducer: {
        test : testSlice.reducer,
        eventsConfig : eventSlice.reducer,
        modals : modalSlice.reducer,
        auth : authSlice.reducer,
        profiles : profileSlice.reducer,
        photos : photoSlice.reducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector