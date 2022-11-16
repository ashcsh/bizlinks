//styles
import "./Signup.css"

//react
import { useState, useEffect } from "react"

//hooks
import { useSignup } from "../../hooks/useSignup"
import { useLogin } from "../../hooks/useLogin"

//react-router
import { useNavigate } from "react-router-dom"
import Login from "../login/Login"

export default function Signup() {

  //extract navigate function
  const navigate = useNavigate()

  //get error & signup function from signup hook
  const { success, error, signup } = useSignup()
  const { login } = useLogin()

  //state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rePassword, setRePassword] = useState("")
  const [passwordError, setPasswordError] = useState(null)
  const [userName, setUserName] = useState("")

  //sign user up using email&password and store userName
  const handleSubmit = (e) => {
    if (!passwordError) {
      e.preventDefault()
      signup(email, password, userName)
    }
  }

  useEffect(() => {
    if (error) {
      console.log(error)
    }
  }, [error])
  useEffect(() => {
    if (success) {
      alert("Account Created Succesfully")
      login(email,password)
      navigate("/")
    }
  }, [success])

  //check to see if passwords match
  useEffect(() => {
    if (password !== rePassword) {
      setPasswordError("Passwords do not match")
    } else {
      setPasswordError(null)
    }
  }, [rePassword, password])

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <label>
          <span>User Name:</span>
          <input
            required
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
        </label>
        <label>
          <span>Email:</span>
          <input
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label>
          <span>Password:</span>
          <input
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <label>
          <span>Confirm Password:</span>
          <input
            required
            type="password"
            onChange={(e) => setRePassword(e.target.value)}
            value={rePassword}
          />
          {passwordError && <p>Passwords do not match...</p>}
        </label>
        {!passwordError && <button className="signup-btn">Signup</button>}
        {passwordError && <button disabled className="signup-btn">Signup</button>}
        {error && <h4>{error}</h4>}
      </form>
    </div>
  )
}
