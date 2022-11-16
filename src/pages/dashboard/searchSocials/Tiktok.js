//style
import "./UserSocials.css"

//assets
import DTiktok from "../../../assets/social_svg/Dtiktok.svg"
import ATiktok from "../../../assets/social_svg/Tiktok.svg"

export default function Tiktok({ url }) {

    return (
        <label style={{ height: 100, width: 100 }}>
            {url && <a href={url}><img src={ATiktok} alt="tiktok"/></a>}
            {!url && <img src={DTiktok} alt="tiktok"/>}
        </label>
    )
}
