import "./Profile.css"

import UserProfile from "./UserProfile"

//socials
import Phone from "./searchSocials/Phone"
import Mail from "./searchSocials/Mail"
import Facebook from "./searchSocials/Facebook"
import Instagram from "./searchSocials/Instagram"
import Snapchat from "./searchSocials/Snapchat"
import Linkedin from "./searchSocials/Linkedin"
import Twitter from "./searchSocials/Twitter"
import Tiktok from "./searchSocials/Tiktok"
import Youtube from "./searchSocials/Youtube"

import { useParams } from "react-router-dom"
import { useGetDocument } from "../../hooks/useGetDocument"

import { IoBusinessSharp } from "react-icons/io5"
import { IoLocationOutline } from "react-icons/io5"


export default function Profile() {
    const { id } = useParams()
    const { document } = useGetDocument("business", id)

    return (
        <div>
            {document &&
                <>
                    <div style={{ color: "white" }}>
                        <img style={{ width: 100, height: 100 }} src={document.logo} alt="logo" />
                        <h2>{document.name}</h2>
                        <ul>
                            <li><IoBusinessSharp/>{document.industry}</li>
                            <li><IoLocationOutline/>{document.location}</li>
                        </ul>
                        <h2>{document.bdescription}</h2>
                        <a style={{ textDecoration: "none", color: "white" }} href={document.website}>Visit Website</a>
                    </div>
                    <div className="social_img">
                        <Facebook url={document.facebook} />
                        <Instagram url={document.instagram} />
                        <Linkedin url={document.linkedin} />
                        <Mail url={document.mail} />
                        <Phone url={document.phone} />
                        <Snapchat url={document.snapchat} />
                        <Tiktok url={document.tiktok} />
                        <Twitter url={document.twitter} />
                        <Youtube url={document.youtube} />
                    </div>
                    <UserProfile uid={id} />
                </>
            }
        </div>
    )
}
