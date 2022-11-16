//style
import "./UserSocials.css"

//assets
import DLinkedin from "../../../assets/social_svg/Dlinkedin.svg"
import ALinkedin from "../../../assets/social_svg/Linkedin.svg"

export default function Linkedin({ url }) {

    return (
        <label style={{ height: 100, width: 100 }}>
            {url && <a href={url}><img src={ALinkedin} alt="linkedin"/></a>}
            {!url && <img src={DLinkedin} alt="linkedin"/>}
        </label>
    )
}
