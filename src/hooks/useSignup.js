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

    const signup = async (email, password, userName) => {
        setError(null)
        setSuccess(false)
        const resData = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(auth.currentUser, { displayName: userName })
        await setDoc(doc(db, "users", resData.user.uid), { userName })
        await setDoc(doc(db,"business", resData.user.uid), { publish:false, showUser: false, name: null })
        localStorage.setItem("userData", JSON.stringify(resData.user))
        if (resData.error){
            setError(resData.error.message)
        }else {
            setSuccess(true)
            dispatch({ type: "LOGIN", payload: resData.user })
        }

    }

    return {success, error, signup }
}