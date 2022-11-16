//style
import "./UserSocials.css"

//assets
import DFacebook from "../../../assets/social_svg/Dfacebook.svg"
import AFacebook from "../../../assets/social_svg/Facebook.svg"


export default function Facebook({ url }) {


    return (
        <label style={{ height: 100, width: 100 }}>
            {url && <a href={url}><img src={AFacebook} alt="facebook"/></a>}
            {!url && <img src={DFacebook} alt="facebook"/>}
        </label>
    )
}
