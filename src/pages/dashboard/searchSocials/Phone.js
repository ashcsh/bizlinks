//style
import "./UserSocials.css"

//assets
import DPhone from "../../../assets/social_svg/Dphone.svg"
import APhone from "../../../assets/social_svg/Phone.svg"

export default function Phone({ url }) {

    return (
        <label style={{ height: 100, width: 100 }}>
            {url && <a href={url}><img src={APhone} alt="phone"/></a>}
            {!url && <img src={DPhone} alt="phone"/>}
        </label>
    )
}
