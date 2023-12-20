import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch } from "../../store/store";
import { GenericActions } from "../../store/genericSlice";
import {
  DocumentData,
  Timestamp,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { toast } from "react-toastify";

type ListnerState = {
  name?: string;
  unsubscribe: () => void;
};
export const useFireStore = <T extends DocumentData>(path: string) => {
  const listenersRef = useRef<ListnerState[]>([]);
  useEffect(() => {
    let listenerRefValue: ListnerState[] | null = null;
    if (listenersRef.current) {
      listenerRefValue = listenersRef.current;
    }
    return () => {
      if (listenerRefValue) {
        listenerRefValue.forEach((listener) => {
          listener.unsubscribe();
        });
      }
    };
  }, []);
  const dispatch = useAppDispatch();

  const loadCollection = useCallback(
    (actions: GenericActions<T>) => {
      dispatch(actions.loading());
      const query = collection(db, path);
      const listener = onSnapshot(query, {
        next: (querySnapshot) => {
          const data: DocumentData[] = [];
          if (querySnapshot.empty) {
            dispatch(actions.success([] as unknown as T));
            return;
          }
          querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
          });
          dispatch(actions.success(data as unknown as T));
        },
        error: (error) => {
          dispatch(actions.error(error.message));
          console.log("Collection error:", error.message);
        },
      });
      listenersRef.current.push({ name: path, unsubscribe: listener });
    },
    [dispatch, path]
  );

  const loadDocument = useCallback(
    (id: string, actions: GenericActions<T>) => {
      dispatch(actions.loading());
      const docRef = doc(db, path, id);

      const listener = onSnapshot(docRef, {
        next: (doc) => {
          if (!doc.exists) {
            dispatch(actions.error("Document does not exist"));
            return;
          }
          dispatch(
            actions.success({ id: doc.id, ...doc.data() } as unknown as T)
          );
        },
      });
      listenersRef.current.push({
        name: path + "/" + id,
        unsubscribe: listener,
      });
    },
    [dispatch, path]
  );

  const updateDocument = async (data: T) => {
    try {
      const eventRef = doc(db, path, data.id);
      console.log(data.id);
      await updateDoc(eventRef, {
        ...data,
        date: Timestamp.fromDate(new Date(data.date)),
      });
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const createDocument = async (data: T)  => {
    try {
      const newEventRef = doc(collection(db, path));
      await setDoc(newEventRef, {
        ...data,
        hostedBy: "Bob",
        attendees: [],
        hostPhotoURL: "",
        date: Timestamp.fromDate(new Date(data.date)),
        isCanceled: false
      });
      return newEventRef ;
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const deleteDocument =async (id:string) => {
    try {
        await deleteDoc(doc(db, path, id));
        
      } catch (error : any) {
        console.log(error.message)
        toast.error("Something has gone wrong wit deleting the event")
      }
  }

  return { loadCollection, loadDocument, updateDocument, createDocument,deleteDocument };
};
