export type AppUser = {
    uid? : string;
    displayName : string | null;
    photoURL : string | null;
    email : string | null |undefined;
    providerId : string | null;
}