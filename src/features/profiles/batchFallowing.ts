import { collection, doc, increment, writeBatch } from "firebase/firestore";
import { auth, db } from "../../app/config/firebase";
import { Profile } from "../../app/types/profile";

export async function batchFollow(profile : Profile, follow : boolean) {
    const currentUser = auth.currentUser;
    if(!currentUser) throw new Error('User not logged in');

    const currentUserFollowingDocRef = collection(db, `profiles/${currentUser.uid}/following`);
    const currentUserProfileDocRef = doc(db, `profiles/${currentUser.uid}`);

    const targetUserFollowerDocRef = collection(db, `profiles/${profile.id}/followers`);

    const targetUserProfileDocRef = doc(db, `profiles/${profile.id}`);

    const batch = writeBatch(db);

    if(!follow) {
        batch.update(currentUserProfileDocRef, {
            followingCount : increment(1)
        });
        batch.update(targetUserProfileDocRef, {
            followerCount : increment(1)
        });
        batch.set(doc(currentUserFollowingDocRef, profile.id), {
            displayName : profile.displayName,
            photoURL : profile.photoURL,
            uid : profile.id
        });
        batch.set(doc(targetUserFollowerDocRef, currentUser.uid), {
            displayName : currentUser.displayName,
            photoURL : currentUser.photoURL,
            uid : currentUser.uid
        });
    } else {
        batch.delete(doc(currentUserFollowingDocRef, profile.id));
        batch.delete(doc(targetUserFollowerDocRef, currentUser.uid));
        batch.update(currentUserProfileDocRef, {
            followingCount : increment(-1)
        });
        batch.update(targetUserProfileDocRef, {
            followerCount : increment(-1)
        });

    }
    await batch.commit();

}