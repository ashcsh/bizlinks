//style
import "./UserSocials.css"

//assets
import DMail from "../../../assets/social_svg/Dmail.svg"
import AMail from "../../../assets/social_svg/Mail.svg"

export default function Mail({ url }) {

    return (
        <label style={{ height: 100, width: 100 }}>
            {url && <a href={url}><img src={AMail} alt="email"/></a>}
            {!url && <img src={DMail} alt="email"/>}
        </label>
    )
}