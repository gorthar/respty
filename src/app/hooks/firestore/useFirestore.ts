import { useEffect, useRef } from "react";

type ListenerState = {
    name? : string,
    unsubscribe : () => void
}

export const useFireStore = (path:string)=>{
    const listenersRef = useRef<ListenerState[]>([]);

    useEffect(()=>{
        return ()=>{
            if(listenersRef.current.length){
                listenersRef.current.forEach((listener)=>{
                    listener.unsubscribe();
                })
            }
        }
    },[])


}