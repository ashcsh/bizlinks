//react
import { useState } from "react"

//context
import { useAuthContext } from "./useAuthContext"

//firebase
import { auth, updateProfile, db } from "../firebase/config"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"

export const useSignup = () => {
    //state
    const [error, setError] = useState(null)
    //dispatch
    const { dispatch } = useAuthContext()

    const signup = async (email, password, userName) => {
        setError(null)
        const resData = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(auth.currentUser, { displayName: userName })
        await setDoc(doc(db, "users", resData.user.uid), { userName })
        if (resData.error){
            setError(resData.error.message)
        }else {

            dispatch({ type: "LOGIN", payload: resData.user })
        }

    }

    return { error, signup }
}