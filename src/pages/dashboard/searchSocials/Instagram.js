//style
import "./UserSocials.css"

//assets
import DInstagram from "../../../assets/social_svg/Dinstagram.svg"
import AInstagram from "../../../assets/social_svg/Instagram.svg"

export default function Instagram({ url }) {


    return (
        <label style={{ height: 100, width: 100 }}>
            {url && <a href={url}><img src={AInstagram} alt="instagram"/></a>}
            {!url && <img src={DInstagram} alt="instagram"/>}
        </label>
    )
}
