//styles
import "./MyPage.css"

//react
import { useState, useEffect } from 'react'
import { Switch } from "@mui/material"

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
import BusinessPage from "./BusinessPage"
import SetupBusinessPage from "./SetupBusinessPage"

//assets
import AvatarPlaceholder from "../../assets/profilePhotoPlaceholder.svg"
import { IoDocuments } from "react-icons/io5"

//copy to clipboard function
import { CopyToClipboard } from "react-copy-to-clipboard"

//firebase
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage"
import { storage } from "../../firebase/config"
import { setDoc, doc } from "firebase/firestore"
import { db } from "../../firebase/config"

//hooks
import { useGetDocument } from "../../hooks/useGetDocument"


export default function MyPage() {

    // STATE // 
    //user Avatar & UserName
    const [profilePhotoError, setProfilePhotoError] = useState("")
    const [avatarPhoto, setAvatarPhoto] = useState(null)
    const [userName, setUserName] = useState(null)

    //trigger
    const [trigger, setTrigger] = useState(null)

    //visibility settings
    const [showBusiness, setShowBusiness] = useState(null)
    const [showUser, setShowUser] = useState(null)

    //User Profile Data
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

    //BusinessProfileData
    const [business, setBusiness] = useState(false)
    const [businessMail, setBusinessMail] = useState(null)
    const [businessPhone, setBusinessPhone] = useState(null)
    const [businessFacebook, setBusinessFacebook] = useState(null)
    const [businessInstagram, setBusinessInstagram] = useState(null)
    const [businessSnapchat, setBusinessSnapchat] = useState(null)
    const [businessLinkedin, setBusinessLinkedin] = useState(null)
    const [businessTwitter, setBusinessTwitter] = useState(null)
    const [businessYoutube, setBusinessYoutube] = useState(null)
    const [businessTiktok, setBusinessTiktok] = useState(null)

    //clipboard bool
    const [linkCopied, setLinkCopied] = useState(false)

    //link copied 
    useEffect(() => {
        if (linkCopied) {
            alert("Link Copied Successfully")
            setLinkCopied(false)
        }
    }, [linkCopied])

    //get logged in user ID
    const user = JSON.parse(localStorage.getItem("userData"))

    //get documents
    const { document: userSocials } = useGetDocument("users", user.uid);
    const { document: businessSocials } = useGetDocument("business", user.uid)

    //set undefined to null 
    useEffect(() => {
        if (businessSocials) {
            if (businessSocials.showUser === undefined) {
                setShowUser(null)
            } else {
                setShowUser(businessSocials.showUser)
            }
            if (businessSocials.publish === undefined) {
                setShowBusiness(null)
            } else {
                setShowBusiness(businessSocials.publish)
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
            setBusiness(userSocials.business)
            setAvatarPhoto(userSocials.avatarImg)
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
        }
    }, [businessSocials])

    //add data function that gets passed on to all social components
    const updateUrl = async (collection, socialType, newUrl) => {
        if (newUrl === "") {
            await setDoc(doc(db, collection, user.uid), {
                [socialType]: null
            }, { merge: true })
        } else {
            await setDoc(doc(db, collection, user.uid), {
                [socialType]: newUrl
            }, { merge: true })
        }
    }

    //upload photo to firebase storage
    const addAvatar = (e) => {
        const check = checkPhoto(e)
        const thisProfilePhoto = e.target.files[0]
        if (check !== 1) {
            const imageRef = ref(storage, `${user.uid}/avatar`)
            uploadBytes(imageRef, thisProfilePhoto)
                .then(() => {
                    if (trigger === null) {
                        setTrigger(1)
                        alert("Profile Photo Added Succesfully and Should Change Soon")
                    } else {
                        setTrigger(null)
                        alert("Profile Photo Added Succesfully and Should Change Soon")
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    //check photo for upload errors
    const checkPhoto = (e) => {
        setProfilePhotoError(null)
        let thisProfilePhoto = e.target.files[0]
        if (!thisProfilePhoto) {
            setProfilePhotoError("No file has been selected")
            return 1
        }
        if (!thisProfilePhoto.type.includes("image")) {
            setProfilePhotoError("Please select an image file")
            return 1
        }
        if (thisProfilePhoto.size > 100000) {
            setProfilePhotoError("This image is too big (max 100kb)")
            return 1
        }
        console.log("Profile Photo has been updated")
    }

    //add photoURL to users collection for further fetch and correlation
    const imageFolderRef = ref(storage, `${user.uid}/`)
    useEffect(() => {
        listAll(imageFolderRef)
            .then((res) => {
                res.items.forEach((item) => {
                    if (item.name.includes("avatar")) {
                        getDownloadURL(item).then((url) => {
                            if (!url) {
                                setDoc(doc(db, "users", user.uid), {
                                    avatarImg: null
                                }, { merge: true })
                            } else {
                                setDoc(doc(db, "users", user.uid), {
                                    avatarImg: url
                                }, { merge: true })
                            }
                        })
                    }
                })
            })
    }, [trigger, imageFolderRef, user.uid])

    //showBusiness button
    const handleShowBusiness = async (e) => {
        if (e.target.checked) {
            await setDoc(doc(db, "business", user.uid), {
                publish: true
            }, { merge: true })
        } else {
            await setDoc(doc(db, "business", user.uid), {
                publish: false
            }, { merge: true })
        }
    }

    //showUserButton
    const handleShowUser = async (e) => {
        if (e.target.checked) {
            await setDoc(doc(db, "business", user.uid), {
                showUser: true
            }, { merge: true })
        } else {
            await setDoc(doc(db, "business", user.uid), {
                showUser: false
            }, { merge: true })
        }
    }
    return (
        <div className="profile-dashboard">

            {business && (

                <div id="link-container">
                    {showBusiness && (
                        <>
                            <h2>You are now discoverable at:</h2>
                            <CopyToClipboard
                                text={`https://bizlinks-531f7.web.app/profile/${user.uid}`}
                                onCopy={() => setLinkCopied(true)}
                            >
                                <button>
                                    <IoDocuments size="1.5em" />
                                </button>
                            </CopyToClipboard>
                        </>
                    )
                    }
                    <div className="profile_settings">
                        <label>
                            <span>Show Business</span>
                            <Switch
                                checked={showBusiness}
                                onChange={handleShowBusiness}
                                inputProps={{ 'aria-label': 'controlled' }}
                                deaultChecked
                                color="secondary"
                            />
                        </label>
                        <label>
                            <span>Show User Information</span>
                            <Switch
                                checked={showUser}
                                onChange={handleShowUser}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </label>
                    </div>
                </div>

            )}
            <>
                {business && (
                    <>
                        <BusinessPage />
                        <div id="business-socials">
                            <div id="Bmail">
                                <Mail
                                    url={businessMail}
                                    updateUrl={updateUrl}
                                    dataType={"email"}
                                    collection={"business"}
                                    socialType={"email"}
                                    editMode={true}
                                />
                            </div>
                            <div id="Bphone">
                                <Phone
                                    url={businessPhone}
                                    updateUrl={updateUrl}
                                    dataType={"number"}
                                    collection={"business"}
                                    socialType={"phone"}
                                    editMode={true}
                                />
                            </div>
                            <div id="Blinkedin">
                                <Linkedin
                                    url={businessLinkedin}
                                    updateUrl={updateUrl}
                                    dataType={"url"}
                                    collection={"business"}
                                    socialType={"linkedin"}
                                    editMode={true}
                                />
                            </div>
                            <div id="Btwitter">
                                <Twitter
                                    url={businessTwitter}
                                    updateUrl={updateUrl}
                                    dataType={"url"}
                                    collection={"business"}
                                    socialType={"twitter"}
                                    editMode={true}
                                />
                            </div>
                            <div id="Bfacebook">
                                <Facebook
                                    url={businessFacebook}
                                    updateUrl={updateUrl}
                                    dataType={"url"}
                                    collection={"business"}
                                    socialType={"facebook"}
                                    editMode={true}
                                />
                            </div>
                            <div id="Binstagram">
                                <Instagram
                                    url={businessInstagram}
                                    updateUrl={updateUrl}
                                    dataType={"url"}
                                    collection={"business"}
                                    socialType={"instagram"}
                                    editMode={true}
                                />
                            </div>
                            <div id="Bsnapchat">
                                <Snapchat
                                    url={businessSnapchat}
                                    updateUrl={updateUrl}
                                    dataType={"url"}
                                    collection={"business"}
                                    socialType={"snapchat"}
                                    editMode={true}
                                />
                            </div>
                            <div id="Byoutube">
                                <Youtube
                                    url={businessYoutube}
                                    updateUrl={updateUrl}
                                    dataType={"url"}
                                    collection={"business"}
                                    socialType={"youtube"}
                                    editMode={true}
                                />
                            </div>
                            <div id="Btiktok">
                                <Tiktok
                                    url={businessTiktok}
                                    updateUrl={updateUrl}
                                    dataType={"url"}
                                    collection={"business"}
                                    socialType={"tiktok"}
                                    editMode={true}
                                />
                            </div>
                        </div>
                    </>
                )}
                {!business && <SetupBusinessPage />}
            </>
            <div className="profile-grid-container">
                <div id="Avatar">
                    <label id="avatar-label" >
                        {avatarPhoto && <img src={avatarPhoto} alt="avatarPhoto" />}
                        {!avatarPhoto && <img src={AvatarPlaceholder} alt="avatarPhoto" />}
                        <input style={{ display: "none" }} type="file" onChange={addAvatar} />
                    </label>
                    {profilePhotoError && <p>{profilePhotoError}</p>}
                </div>
                <div id="UserName">
                    {userName && <h2>{userName}</h2>}
                </div>
                <div id="Mail">
                    <Mail
                        url={userMail}
                        updateUrl={updateUrl}
                        dataType={"email"}
                        collection={"users"}
                        socialType={"email"}
                        editMode={true}
                    />
                </div>
                <div id="Phone">
                    <Phone
                        url={userPhone}
                        updateUrl={updateUrl}
                        dataType={"number"}
                        collection={"users"}
                        socialType={"phone"}
                        editMode={true}
                    />
                </div>
                <div id="Linkedin">
                    <Linkedin
                        url={userLinkedin}
                        updateUrl={updateUrl}
                        dataType={"url"}
                        collection={"users"}
                        socialType={"linkedin"}
                        editMode={true}
                    />
                </div>
                <div id="Twitter">
                    <Twitter
                        url={userTwitter}
                        updateUrl={updateUrl}
                        dataType={"url"}
                        collection={"users"}
                        socialType={"twitter"}
                        editMode={true}
                    />
                </div>
                <div id="Facebook">
                    <Facebook
                        url={userFacebook}
                        updateUrl={updateUrl}
                        dataType={"url"}
                        collection={"users"}
                        socialType={"facebook"}
                        editMode={true}
                    />
                </div>
                <div id="Instagram">
                    <Instagram
                        url={userInstagram}
                        updateUrl={updateUrl}
                        dataType={"url"}
                        collection={"users"}
                        socialType={"instagram"}
                        editMode={true}
                    />
                </div>
                <div id="Snapchat">
                    <Snapchat
                        url={userSnapchat}
                        updateUrl={updateUrl}
                        dataType={"url"}
                        collection={"users"}
                        socialType={"snapchat"}
                        editMode={true}
                    />
                </div>
                <div id="Tiktok">
                    <Tiktok
                        url={userTiktok}
                        updateUrl={updateUrl}
                        dataType={"url"}
                        collection={"users"}
                        socialType={"tiktok"}
                        editMode={true}
                    />
                </div>
                <div id="Youtube">
                    <Youtube
                        url={userYoutube}
                        updateUrl={updateUrl}
                        dataType={"url"}
                        collection={"users"}
                        socialType={"youtube"}
                        editMode={true}
                    />
                </div>
                <div id="Custom">
                    <Custom
                        url={userCustomUrl}
                        img={userCustomImg}
                        editMode={true}
                    />
                </div>
            </div>
        </div>
    )
}
