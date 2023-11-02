import { createSlice } from "@reduxjs/toolkit";
import { AppEvent } from "../types/events";
import { sampleData } from "../layout/api/sampleData";

// type Event={
//     id : string;
//     title : string;
//     date : string;
//     description : string;
//     category : string;
//     city : string;
//     venue : string;
//     hostedBy : string;
//     hostPhotoURL : string;
//     attendees : Attendee[];
// }
// type Attendee={
//     id : string;
//     name : string;
//     photoURL : string;
// }

type State={
    events: AppEvent[]
}

const initialState: State = {events : sampleData}


export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers:{
        addEvent: (state, action) => {
            state.events.push(action.payload)
        },
        updateEvent: (state, action) => {
            state.events = state.events.map(event => event.id === action.payload.id ? action.payload : event)

            // state.events[state.events.findIndex(event => event.id === action.payload.id)] = action.payload
        },
        deleteEvent: (state, action) => {
            state.events = state.events.filter(event => event.id !== action.payload)

            // state.events.splice(state.events.findIndex(event => event.id === action.payload), 1)
        }
    }
})
export const { addEvent, updateEvent, deleteEvent } = eventSlice.actions