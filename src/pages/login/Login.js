//styles
import "./Login.css"

//react
import { useState, useEffect } from "react"

//hooks
import { useLogin } from "../../hooks/useLogin"

//router
import { useNavigate } from "react-router-dom"

export default function Login() {
  //state 
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()
  const { loginError, login } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    login(email, password)
      if(!loginError) {
        console.log("aici", loginError)
      }else {
        navigate("/")
      }
  }

  useEffect(() => {
    
  })

  

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
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
        <button className="login-btn">Login</button>
        {loginError && <p>{loginError}</p>}
      </form>
    </div>
  )
}
