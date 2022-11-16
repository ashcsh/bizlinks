//assets
import LogoPlaceholder from "../../assets/businessPhotoPlaceholder.svg"

//react
import { useState, useEffect } from "react"

//hooks
import { useAuthContext } from '../../hooks/useAuthContext'

//firebase
import { doc, setDoc } from "firebase/firestore"
import { db } from "../../firebase/config"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "../../firebase/config"


export default function SetupBusinessPage(props) {

    //state
    const [open, setOpen] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState()
    const [logoError, setLogoError] = useState(null)
    const [name, setName] = useState(null)
    const [industry, setIndustry] = useState(null)
    const [location, setLocation] = useState(null)
    const [bdescription, setBdescription] = useState(null)
    const [website, setWebsite] = useState(null)
    const [exception, setException] = useState(false)

    //get user
    const { user } = useAuthContext()

    //get document data and update state
    useEffect(() => {
        if (props.businessInfo) {
            let fetch = props.businessInfo
            setName(fetch.name)
            setIndustry(fetch.industry)
            setLocation(fetch.location)
            setBdescription(fetch.bdescription)
            setWebsite(fetch.website)
            setPreview(fetch.logo)
            setSelectedFile(1)
        }
    }, [props.businessInfo])

    //preview selected image before upload
    useEffect(() => {
        if (exception) {
            if (!selectedFile) {
                setPreview(null)
                return
            }
            const objectUrl = URL.createObjectURL(selectedFile)
            setPreview(objectUrl)
            setLogoError(null)
            return () => URL.revokeObjectURL(objectUrl)
        }
    }, [selectedFile, exception])


    //check photo and update state with photo file
    const handleLogoChange = e => {
        setLogoError(null)
        setException(true)
        let thisProfilePhoto = e.target.files[0]
        if (!thisProfilePhoto) {
            setLogoError("No file has been selected")
            setPreview(null)
            setSelectedFile(null)
            return
        }
        if (!thisProfilePhoto.type.includes("image")) {
            setLogoError("Please select an image file")
            setPreview(null)
            setSelectedFile(null)
            return
        }
        if (thisProfilePhoto.size > 100000) {
            setLogoError("This image is too big (max 100kb)")
            setPreview(null)
            setSelectedFile(null)
            return
        }
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(null)
            return
        }
        setSelectedFile(thisProfilePhoto)
    }


    //if user cancels setup: reset state
    const handleFakeSubmit = () => {
        setOpen(false)
        props.setEditMode(null)
        setPreview(null)
        setSelectedFile(null)
        setLogoError(null)

        setName(null)
        setIndustry(null)
        setLocation(null)
        setBdescription(null)
        setWebsite(null)
    }


    //add business info to business collection and add avatar photo to storage
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (selectedFile !== null && selectedFile !== 1) {
            const photoType = selectedFile.type.replace("image/", "")
            const imageRef = ref(storage, `${user.uid}/logo`)
            uploadBytes(imageRef, selectedFile)
                .then(() => { getDownloadLink(photoType) })
            await setDoc(doc(db, "business", user.uid), {
                name,
                industry,
                location,
                bdescription,
                website
            }, { merge: true })
            await setDoc(doc(db, "users", user.uid),
                { business: true }, { merge: true })
            setOpen(false)
            props.setEditMode(null)
        } else if (props.editMode) {
            await setDoc(doc(db, "business", user.uid), {
                name,
                industry,
                location,
                bdescription,
                website
            }, { merge: true })
            setOpen(false)
            props.setEditMode(null)
        } else {
            setLogoError("Please select a Img for Your logo")
        }
    }


    //get avatar download link and add it to the document 
    const getDownloadLink = () => {
        const fileRef = ref(storage, `${user.uid}/logo`)
        getDownloadURL(fileRef)
            .then((url) => {
                if (!url) {
                    setDoc(doc(db, "business", user.uid), {
                        logo: null
                    }, { merge: true })
                } else {
                    setDoc(doc(db, "business", user.uid), {
                        logo: url
                    }, { merge: true })
                }
            })
    }


    //activate edit mode
    useEffect(() => {
        if (props.editMode === true) {
            setOpen(true)
        }
    }, [props.editMode])


    return (
        <>
            {!props.editMode && (
                <button id="business-button" onClick={() => { setOpen(true) }}>
                    <span>
                        Setup Business Profile
                    </span>
                </button>
            )}
            {open && (
                <>
                    <div className="background">
                        <div className="modal">
                            <>
                                <div className="close-modal" onClick={handleFakeSubmit}>
                                    <span>x</span>
                                </div>
                                <span>Add image:</span>
                                <form onSubmit={handleSubmit}>
                                    <label>
                                        <span>Logo</span>
                                        {!selectedFile && <img src={LogoPlaceholder} alt="placeholder"/>}
                                        {selectedFile && <img src={preview} alt="preview"/>}
                                        <input type="file" onChange={handleLogoChange} style={{ display: "none" }} />
                                    </label>
                                    {logoError && <span>{logoError}</span>}
                                    <label>
                                        <span> Company Name</span>
                                        <input required type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
                                    </label>
                                    <label>
                                        <span>Industry</span>
                                        <input required type="text" value={industry} onChange={(e) => { setIndustry(e.target.value) }} />
                                    </label>
                                    <label>
                                        <span>Location</span>
                                        <input required type="text" value={location} onChange={(e) => { setLocation(e.target.value) }} />
                                    </label>
                                    <label>
                                        <span>Description</span>
                                        <textarea required type="text" value={bdescription} onChange={(e) => { setBdescription(e.target.value) }} />
                                    </label>
                                    <label>
                                        <span>Website</span>
                                        <input required type="url" value={website} onChange={(e) => { setWebsite(e.target.value) }} />
                                    </label>
                                    <button>Update</button>
                                </form>
                            </>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
