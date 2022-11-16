//styles
import "./Navbar.css"

//icons
import { AiOutlineMenu } from "react-icons/ai"

//react
import { useRef } from "react"

//router
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

//assets
import LogoImage from "../assets/bizlinksLogo.svg"

//hooks
import { useLogout } from '../hooks/useLogout'

//context
import { useAuthContext } from '../hooks/useAuthContext'

export default function Navbar() {
    const toggleRef = useRef()
    const navigate = useNavigate()
    const { user } = useAuthContext()
    const { logout } = useLogout()

    const toggle = () => {
        toggleRef.current.classList.toggle("responsive")
    }

    const handleClick = (e) => {
        e.preventDefault()
        logout()
        navigate("/")
    }

    const logoClick = () => {
        navigate("/")
    }

    return (
        <div className="navbar">
            <div className="navbar-logo" onClick={logoClick}>
                <img src={LogoImage} alt="logo" />
                <span>BIZLINKS</span>
            </div>
            <nav ref={toggleRef}>
                <div className="conditional-nav">
                    {user &&
                        <>
                            <Link to="/">Dashboard</Link>
                            <Link to="/myPage">Profile</Link>
                        </>}
                </div>
                <div className="user-nav">
                    {!user && (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </>)}
                    {user && <Link onClick={handleClick}>Logout</Link>}
                    <button className="nav-close" onClick={toggle}>
                        <AiOutlineMenu />
                    </button>
                </div>
            </nav>
            <button className="nav-open" onClick={toggle}>
                <AiOutlineMenu />
            </button>
        </div>
    )
}