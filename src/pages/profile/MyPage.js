//styles
import "./MyPage.css"

//react
import { useState, useEffect } from 'react'

//components
import Linkedin from "./socials/Linkedin"
import Facebook from "./socials/Facebook"
import Instagram from "./socials/Instagram"
import Twitter from "./socials/Twitter"
import Mail from "./socials/Mail"
import Phone from "./socials/Phone"
import Snapchat from "./socials/Snapchat"
import Tiktok from "./socials/Tiktok"
import Youtube from "./socials/Youtube"
import Custom from "./socials/Custom"
import BusinessPage from "./BusinessPage"
import SetupBusinessPage from "./SetupBusinessPage"

//assets
import AvatarPlaceholder from "../../assets/profilePhotoPlaceholder.svg"

//context
import { useAuthContext } from '../../hooks/useAuthContext'

//firebase
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage"
import { storage } from "../../firebase/config"
import { setDoc, doc } from "firebase/firestore"
import { db } from "../../firebase/config"

//hooks
import { useGetDocument } from "../../hooks/useGetDocument"

export default function MyPage() {
    //state
    const [profilePhotoError, setProfilePhotoError] = useState("")
    const [avatarPhoto, setAvatarPhoto] = useState(null)
    const [trigger, setTrigger] = useState(null)
    const [business, setBusiness] = useState(false)
    const [userName, setUserName] = useState(null)
    
    //get logged in user ID
    const { user } = useAuthContext()

    //get document
    const { document } = useGetDocument("users", user.uid);

    //set state by using document data
    useEffect(() => {
        if (document) {
            setUserName(document.userName)
            setBusiness(document.business)
            setAvatarPhoto(document.avatarImg)
        }
    }, [document])

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

    return (
        <div className="dashboard">
            <div id="business-container">
                {business && (
                    <>
                        <BusinessPage />
                        <div>
                            <Mail props={"business"} />
                            <Phone props={"business"} />
                            <Linkedin props={"business"} />
                            <Twitter props={"business"} />
                            <Facebook props={"business"} />
                            <Instagram props={"business"} />
                            <Snapchat props={"business"} />
                            <Youtube props={"business"} />
                            <Tiktok props={"business"} />
                        </div>
                    </>
                )}
                {!business && <SetupBusinessPage />}
            </div>
            <div className="profile-grid-container">
                <div id="Avatar">
                    <label style={{ cursor: "pointer", borderRadius: "100%", backgroundColor: "black" }}>
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
                    <Mail props={"users"} />
                </div>
                <div id="Phone">
                    <Phone props={"users"} />
                </div>
                <div id="Linkedin">
                    <Linkedin props={"users"} />
                </div>
                <div id="Twitter">
                    <Twitter props={"users"} />
                </div>
                <div id="Facebook">
                    <Facebook props={"users"} />
                </div>
                <div id="Instagram">
                    <Instagram props={"users"} />
                </div>
                <div id="Snapchat">
                    <Snapchat props={"users"} />
                </div>
                <div id="Tiktok">
                    <Tiktok props={"users"} />
                </div>
                <div id="Youtube">
                    <Youtube props={"users"} />
                </div>
                <div id="Custom">
                    <Custom />
                </div>
            </div>
        </div>
    )
}
