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
    const [loginSuccess, setLoginSuccess] = useState(false)
    //dispatch
    const { dispatch } = useAuthContext()

    const login = (email, password) => {
        setLoginError(null)
        setLoginSuccess(false)
        signInWithEmailAndPassword(auth, email, password)
            .then(res => {
                localStorage.setItem("userData", JSON.stringify(res.user))
                dispatch({ type: "LOGIN", payload: res.user })
                setLoginSuccess(true)
            })
            .catch((err) => {
                setLoginError(err.message)
                console.log(err.message)
            })
    }

    return { loginSuccess, loginError, login }
}
