//react
import { useState, useEffect } from "react"

//firebase
import { db } from "../firebase/config"
import { onSnapshot, doc } from "firebase/firestore"

export const useGetDocument = (collectionName, userId) => {
    //state
    const [document, setDocument] = useState(null)

    useEffect(() => {
        const unsub = onSnapshot(doc(db, collectionName, userId), (snapshot) => {
            let lego = snapshot.data()
            setDocument(lego)
        })
        return () => unsub()
    }, [collectionName, userId])

    return { document }
}