import { PayloadAction } from "@reduxjs/toolkit";
import { AppEvent } from "../types/events";
import { Timestamp } from "firebase/firestore";
import { GenericActions, GenericState, createGenericSlice } from "./genericSlice";


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
    data: AppEvent[]
}

const initialState: State = {
    data : []
}


export const eventSlice = createGenericSlice({
    name: 'event',
    initialState: initialState as GenericState<AppEvent[]>,
    reducers:{
        success:{
            reducer:(state, action: PayloadAction<AppEvent[]>) => {
                state.data = action.payload
                state.status = 'finished'
            },
            prepare: (events:any) => {
                let eventsArray: AppEvent[] = []
                Array.isArray(events) ? eventsArray = events : eventsArray.push(events)
                const mapedEvents = eventsArray.map((e: any) => {
                    return {...e, date: (e.date as Timestamp).toDate().toISOString()}

                })
                return {payload: mapedEvents}
            }

        }, 

    }
})
export const actions = eventSlice.actions as GenericActions<AppEvent[]>