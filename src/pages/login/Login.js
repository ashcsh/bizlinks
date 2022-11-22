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
  const { loginSuccess, loginError, login } = useLogin()

  //handle login submit
  const handleSubmit =  (e) => {
    e.preventDefault()
    login(email, password)
  }

  //navigate on success
  useEffect(() => {
    if (loginSuccess) {
      navigate("/mypage")
    }
  }, [loginSuccess])

  //show error
  useEffect(() => {
    if (loginError) {
      console.log("There was an error regarding your login.")
    }
  }, [loginError])



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
        <button>Login</button>
        {loginError && <p>{loginError}</p>}
      </form>
    </div>
  )
}
