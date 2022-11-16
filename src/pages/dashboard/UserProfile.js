import React from 'react'
import "./UserProfile.css"

import Phone from "./searchSocials/Phone"
import Mail from "./searchSocials/Mail"
import Facebook from "./searchSocials/Facebook"
import Instagram from "./searchSocials/Instagram"
import Snapchat from "./searchSocials/Snapchat"
import Linkedin from "./searchSocials/Linkedin"
import Twitter from "./searchSocials/Twitter"
import Tiktok from "./searchSocials/Tiktok"
import Youtube from "./searchSocials/Youtube"

import AvatarPlaceholder from "../../assets/profilePhotoPlaceholder.svg"


import { useGetDocument } from '../../hooks/useGetDocument'
import Custom from './searchSocials/Custom'

export default function UserProfile({ uid }) {
  const { document } = useGetDocument("users", uid)
  console.log(document)
  return (
    <>
      {document &&
        <>
        <Custom img={document.customImgURL} url={document.customURL}/>
          <div>
            {!document.avatarImg && <img src={AvatarPlaceholder} alt="avatar"/>}
            {document.avatarImg &&<img src={document.avatarImg} alt="avatar"/>}
            <h2>{document.userName}</h2>
          </div>
          <div>
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
        </>
      }
    </>
  )
}
