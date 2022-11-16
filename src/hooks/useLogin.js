//react
import { useState } from "react"

//firebase
import { auth } from "../firebase/config"
import { signInWithEmailAndPassword } from "firebase/auth"

//context
import { useAuthContext } from "./useAuthContext"

export const useLogin = () => {
    //state  
    const [loginError, setLoginError] = useState(null)
    //dispatch
    const { dispatch } = useAuthContext()

    const login = (email, password) => {
        setLoginError(null)
        signInWithEmailAndPassword(auth, email, password)
            .then(res => {
                dispatch({ type: "LOGIN", payload: res.user })
            })
            .catch((err) => {
                setLoginError(err.message)
                console.log(err.message)
            })
    }

    return { loginError, login }
}
