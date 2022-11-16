//react
import { useState, useEffect } from "react"

//firebase
import { db } from "../firebase/config"
import { collection, onSnapshot } from "firebase/firestore"

export const useGetCollection = (collectionName) => {
    //state
    const [documents, setDocuments] = useState(null)

    useEffect(() => {
        let ref = collection(db, collectionName)
        const unsub = () => {
            onSnapshot(ref, (snapshot) => {
                let results = []
                snapshot.docs.forEach((doc) => {
                    results.push({ ...doc.data(), id: doc.id })
                })
                setDocuments(results)
            })
        }
        return () => unsub()
    }, [collectionName])

    return { documents }

}