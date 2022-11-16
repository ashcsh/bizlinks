//style
import "./UserSocials.css"

//assets
import DTwitter from "../../../assets/social_svg/Dtwitter.svg"
import ATwitter from "../../../assets/social_svg/Twitter.svg"

export default function Twitter({ url }) {

    return (
        <label style={{ height: 100, width: 100 }}>
            {url && <a href={url}><img src={ATwitter} alt="twitter"/></a>}
            {!url && <img src={DTwitter} alt="twitter"/>}
        </label>
    )
}
