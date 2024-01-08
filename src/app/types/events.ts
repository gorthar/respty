export type AppEvent = {
    id : string;
    title : string;
    date : string;
    description : string;
    category : string;
    city : string;
    venue : string;
    hostUid : string;
    hostedBy : string;
    hostPhotoURL : string;
    isCanceled: boolean;
    attendees : Attendee[];
    attendeesIds : string[];
}

export type Attendee = {
    id : string;
    displayName : string;
    photoURL : string;
}
