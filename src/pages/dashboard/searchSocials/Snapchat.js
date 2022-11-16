//style
import "./UserSocials.css"

//assets
import DSnapchat from "../../../assets/social_svg/Dsnapchat.svg"
import ASnapchat from "../../../assets/social_svg/Snapchat.svg"

export default function Snapchat({ url }) {

    return (
        <label style={{ height: 100, width: 100 }}>
            {url && <a href={url}><img src={ASnapchat} alt="snapchat"/></a>}
            {!url && <img src={DSnapchat} alt="snapchat"/>}
        </label>
    )
}
