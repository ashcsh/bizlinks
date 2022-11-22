//firebase
import { auth } from "../firebase/config"
import { signOut } from "firebase/auth"

//context
import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const logout = () => {
        signOut(auth)
            .then(() => {
                dispatch({ type: "LOGOUT" })
                localStorage.setItem("userData", null)
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    return { logout }
}