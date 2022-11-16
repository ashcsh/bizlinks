//style
import "./UserSocials.css"

//assets
import DYoutube from "../../../assets/social_svg/Dyoutube.svg"
import AYoutube from "../../../assets/social_svg/Youtube.svg"

export default function Youtube({ url }) {

    return (
        <label style={{ height: 100, width: 100 }}>
            {url && <a href={url}><img src={AYoutube} alt="youtube"/></a>}
            {!url && <img src={DYoutube} alt="youtube"/>}
        </label>
    )
}
