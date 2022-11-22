//react
import { useState, useEffect } from 'react'



//components
import Linkedin from "../../componenets/socialMedia/Linkedin"
import Facebook from "../../componenets/socialMedia/Facebook"
import Instagram from "../../componenets/socialMedia/Instagram"
import Twitter from "../../componenets/socialMedia/Twitter"
import Mail from "../../componenets/socialMedia/Mail"
import Phone from "../../componenets/socialMedia/Phone"
import Snapchat from "../../componenets/socialMedia/Snapchat"
import Tiktok from "../../componenets/socialMedia/Tiktok"
import Youtube from "../../componenets/socialMedia/Youtube"
import Custom from "../../componenets/socialMedia/Custom"

//icons
import { IoBusinessSharp } from "react-icons/io5"
import { IoLocationOutline } from "react-icons/io5"
import { AiOutlineCloseSquare } from "react-icons/ai"

//assets
import AvatarPlaceholder from "../../assets/profilePhotoPlaceholder.svg"

//hooks
import { useGetDocument } from "../../hooks/useGetDocument"
import { useParams } from "react-router-dom"

export default function SelectedProfile() {
    //state
    const [business, setBusiness] = useState(false)

    //get profile id 
    const { id } = useParams()

    //get documents
    const { document: userSocials } = useGetDocument("users", id);
    const { document: businessSocials } = useGetDocument("business", id)


    //User Profile Data
    const [userName, setUserName] = useState(null)
    const [userAvatar, setUserAvatar] = useState(null)
    const [userMail, setUserMail] = useState(null)
    const [userPhone, setUserPhone] = useState(null)
    const [userFacebook, setUserFacebook] = useState(null)
    const [userInstagram, setUserInstagram] = useState(null)
    const [userSnapchat, setUserSnapchat] = useState(null)
    const [userLinkedin, setUserLinkedin] = useState(null)
    const [userTwitter, setUserTwitter] = useState(null)
    const [userYoutube, setUserYoutube] = useState(null)
    const [userTiktok, setUserTiktok] = useState(null)
    const [userCustomUrl, setUserCustomUrl] = useState(null)
    const [userCustomImg, setUserCustomImg] = useState(null)
    const [showUser, setShowUser] = useState(null)

    //BusinessProfileData
    const [businessMail, setBusinessMail] = useState(null)
    const [businessPhone, setBusinessPhone] = useState(null)
    const [businessFacebook, setBusinessFacebook] = useState(null)
    const [businessInstagram, setBusinessInstagram] = useState(null)
    const [businessSnapchat, setBusinessSnapchat] = useState(null)
    const [businessLinkedin, setBusinessLinkedin] = useState(null)
    const [businessTwitter, setBusinessTwitter] = useState(null)
    const [businessYoutube, setBusinessYoutube] = useState(null)
    const [businessTiktok, setBusinessTiktok] = useState(null)
    const [businessLogo, setBusinessLogo] = useState(null)
    const [businessName, setBusinessName] = useState(null)
    const [businessIndustry, setBusinessIndustry] = useState(null)
    const [businessLocation, setBusinessLocation] = useState(null)
    const [businessWebsite, setBusinessWebsite] = useState(null)
    const [businessDescription, setBusinessDescription] = useState(null)

    // view description button
    const [viewDescription, setViewDescription] = useState(false)

    // set undefined to null 
    useEffect(() => {
        if (businessSocials) {
            if (businessSocials.showUser === undefined) {
                setShowUser(null)
            } else {
                setShowUser(businessSocials.showUser)
            }
        }
    }, [businessSocials])

    //get user data into state
    useEffect(() => {
        if (userSocials) {
            setUserMail(userSocials.email)
            setUserPhone(userSocials.phone)
            setUserFacebook(userSocials.facebook)
            setUserInstagram(userSocials.instagram)
            setUserSnapchat(userSocials.snapchat)
            setUserLinkedin(userSocials.linkedin)
            setUserTwitter(userSocials.twitter)
            setUserYoutube(userSocials.youtube)
            setUserTiktok(userSocials.tiktok)
            setUserCustomUrl(userSocials.customURL)
            setUserCustomImg(userSocials.customImgURL)
            setUserName(userSocials.userName)
            setUserAvatar(userSocials.avatarImg)
            setBusiness(userSocials.business)
        }
    }, [userSocials])

    //get business data into state
    useEffect(() => {
        if (businessSocials) {
            setBusinessMail(businessSocials.email)
            setBusinessPhone(businessSocials.phone)
            setBusinessFacebook(businessSocials.facebook)
            setBusinessInstagram(businessSocials.instagram)
            setBusinessSnapchat(businessSocials.snapchat)
            setBusinessLinkedin(businessSocials.linkedin)
            setBusinessTwitter(businessSocials.twitter)
            setBusinessYoutube(businessSocials.youtube)
            setBusinessTiktok(businessSocials.tiktok)
            setBusinessLogo(businessSocials.logo)
            setBusinessName(businessSocials.name)
            setBusinessIndustry(businessSocials.industry)
            setBusinessLocation(businessSocials.location)
            setBusinessWebsite(businessSocials.website)
            setBusinessDescription(businessSocials.bdescription)
        }
    }, [businessSocials])

    return (
        <div className="profile-dashboard">
            <>
                {business && (
                    <>
                        <div id="business-page">
                            <div id="business-main">
                                <img src={businessLogo} alt="logo" />
                                <h2>{businessName}</h2>
                                <ul>
                                    <li>
                                        <IoBusinessSharp />
                                        <span> {businessIndustry}</span>
                                    </li>
                                    <li>
                                        <IoLocationOutline />
                                        <span> {businessLocation}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div id="button-div">
                            <button onClick={() => { setViewDescription(true) }}>View Description</button>
                            <a href={businessWebsite}>
                                <button >Visit Website</button>
                            </a>
                        </div>
                        {viewDescription && (
                            <div className="background">
                                <div className="modal">
                                    <div className="close-modal" onClick={() => setViewDescription(false)}>
                                        <AiOutlineCloseSquare />
                                    </div>
                                    <h3>{businessDescription}</h3>
                                </div>

                            </div>
                        )}
                        <div id="business-socials">
                            <div id="Bmail">
                                <Mail
                                    url={businessMail}
                                    updateUrl={null}
                                    dataType={"email"}
                                    collection={"business"}
                                    socialType={"email"}
                                    editMode={false}
                                />
                            </div>
                            <div id="Bphone">
                                <Phone
                                    url={businessPhone}
                                    updateUrl={null}
                                    dataType={"number"}
                                    collection={"business"}
                                    socialType={"phone"}
                                    editMode={false}
                                />
                            </div>
                            <div id="Blinkedin">
                                <Linkedin
                                    url={businessLinkedin}
                                    updateUrl={null}
                                    dataType={"url"}
                                    collection={"business"}
                                    socialType={"linkedin"}
                                    editMode={false}
                                />
                            </div>
                            <div id="Btwitter">
                                <Twitter
                                    url={businessTwitter}
                                    updateUrl={null}
                                    dataType={"url"}
                                    collection={"business"}
                                    socialType={"twitter"}
                                    editMode={false}
                                />
                            </div>
                            <div id="Bfacebook">
                                <Facebook
                                    url={businessFacebook}
                                    updateUrl={null}
                                    dataType={"url"}
                                    collection={"business"}
                                    socialType={"facebook"}
                                    editMode={false}
                                />
                            </div>
                            <div id="Binstagram">
                                <Instagram
                                    url={businessInstagram}
                                    updateUrl={null}
                                    dataType={"url"}
                                    collection={"business"}
                                    socialType={"instagram"}
                                    editMode={false}
                                />
                            </div>
                            <div id="Bsnapchat">
                                <Snapchat
                                    url={businessSnapchat}
                                    updateUrl={null}
                                    dataType={"url"}
                                    collection={"business"}
                                    socialType={"snapchat"}
                                    editMode={false}
                                />
                            </div>
                            <div id="Byoutube">
                                <Youtube
                                    url={businessYoutube}
                                    updateUrl={null}
                                    dataType={"url"}
                                    collection={"business"}
                                    socialType={"youtube"}
                                    editMode={false}
                                />
                            </div>
                            <div id="Btiktok">
                                <Tiktok
                                    url={businessTiktok}
                                    updateUrl={null}
                                    dataType={"url"}
                                    collection={"business"}
                                    socialType={"tiktok"}
                                    editMode={false}
                                />
                            </div>
                        </div>
                    </>
                )}
            </>
            {showUser && (

                <div className="profile-grid-container">
                    <div id="Avatar">
                        <label id="avatar-label" >
                            {userAvatar && <img style={{ cursor: "default" }} src={userAvatar} alt="avatarPhoto" />}
                            {!userAvatar && <img style={{ cursor: "default" }} src={AvatarPlaceholder} alt="avatarPhoto" />}
                        </label>
                    </div>
                    <div id="UserName">
                        {userName && <h2>{userName}</h2>}
                    </div>
                    <div id="Mail">
                        <Mail
                            url={userMail}
                            updateUrl={null}
                            dataType={"email"}
                            collection={"users"}
                            socialType={"email"}
                            editMode={false}
                        />
                    </div>
                    <div id="Phone">
                        <Phone
                            url={userPhone}
                            updateUrl={null}
                            dataType={"number"}
                            collection={"users"}
                            socialType={"phone"}
                            editMode={false}
                        />
                    </div>
                    <div id="Linkedin">
                        <Linkedin
                            url={userLinkedin}
                            updateUrl={null}
                            dataType={"url"}
                            collection={"users"}
                            socialType={"linkedin"}
                            editMode={false}
                        />
                    </div>
                    <div id="Twitter">
                        <Twitter
                            url={userTwitter}
                            updateUrl={null}
                            dataType={"url"}
                            collection={"users"}
                            socialType={"twitter"}
                            editMode={false}
                        />
                    </div>
                    <div id="Facebook">
                        <Facebook
                            url={userFacebook}
                            updateUrl={null}
                            dataType={"url"}
                            collection={"users"}
                            socialType={"facebook"}
                            editMode={false}
                        />
                    </div>
                    <div id="Instagram">
                        <Instagram
                            url={userInstagram}
                            updateUrl={null}
                            dataType={"url"}
                            collection={"users"}
                            socialType={"instagram"}
                            editMode={false}
                        />
                    </div>
                    <div id="Snapchat">
                        <Snapchat
                            url={userSnapchat}
                            updateUrl={null}
                            dataType={"url"}
                            collection={"users"}
                            socialType={"snapchat"}
                            editMode={false}
                        />
                    </div>
                    <div id="Tiktok">
                        <Tiktok
                            url={userTiktok}
                            updateUrl={null}
                            dataType={"url"}
                            collection={"users"}
                            socialType={"tiktok"}
                            editMode={false}
                        />
                    </div>
                    <div id="Youtube">
                        <Youtube
                            url={userYoutube}
                            updateUrl={null}
                            dataType={"url"}
                            collection={"users"}
                            socialType={"youtube"}
                            editMode={false}
                        />
                    </div>
                    <div id="Custom">
                        <Custom
                            url={userCustomUrl}
                            img={userCustomImg}
                            editMode={false}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
