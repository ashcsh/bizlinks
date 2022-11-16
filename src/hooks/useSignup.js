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
    const [success, setSuccess] = useState(false)
    //dispatch
    const { dispatch } = useAuthContext()

    const signup = (email, password, userName) => {
        setError(null)
        createUserWithEmailAndPassword(auth, email, password)
            .then(res => {
                updateProfile(auth.currentUser, { displayName: userName })
                setDoc(doc(db, "users", res.user.uid), {
                    userName
                })
                console.log(res.user)
            })
            .then(res => {
                console.log(res.user)
                dispatch({ type: "LOGIN", payload: res.user })
                setSuccess(true)
            })
            .catch(error => {
                setError(error.message)
            })
    }

    return { success, error, signup }
}