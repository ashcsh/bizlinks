import "./Modal.css"
import { useState, useEffect } from "react"
import { useAuthContext } from '../../../hooks/useAuthContext'

import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "../../../firebase/config"

import ImgPlaceholder from "../../../assets/socialPhotoPlaceholder.svg"

import { doc, setDoc } from "firebase/firestore"
import { db } from "../../../firebase/config"

import { AiOutlineCloseSquare } from "react-icons/ai"

export default function CustomModal({ setOpen, customPhoto, customUrl }) {



    //   //context
    const { user } = useAuthContext()

    //   //state
    const [customPhotoError, setCustomPhotoError] = useState(null)
    const [newUrl, setNewUrl] = useState(customUrl)



    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)



    useEffect(() => {
        if (!selectedFile) {
            setPreview(null)
            return
        }
        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])



    const handleChange = e => {
        setCustomPhotoError(null)
        let thisProfilePhoto = e.target.files[0]
        if (!thisProfilePhoto) {
            setCustomPhotoError("No file has been selected")
            setPreview(null)
            setSelectedFile(null)
            return
        }
        if (!thisProfilePhoto.type.includes("image")) {
            setCustomPhotoError("Please select an image file")
            setPreview(null)
            setSelectedFile(null)
            return
        }
        if (thisProfilePhoto.size > 100000) {
            setCustomPhotoError("This image is too big (max 100kb)")
            setPreview(null)
            setSelectedFile(null)
            return
        }
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        setSelectedFile(thisProfilePhoto)
    }
    const getDownloadLink = (photoType) => {
        const fileRef = ref(storage, `${user.uid}/custom.${photoType}`)
        getDownloadURL(fileRef)
            .then((url) => {
                console.log("am ajuns aici la GET DOWNLOAD URL")
                if (!url) {
                    setDoc(doc(db, "users", user.uid), {
                        customImgURL: null
                    }, { merge: true })
                } else {
                    setDoc(doc(db, "users", user.uid), {
                        customImgURL: url
                    }, { merge: true })
                }
            })
    }

    const addUrlToDocument = () => {
        if (!newUrl) {
            setDoc(doc(db, "users", user.uid), {
                customURL: null,
            }, { merge: true })

        } else {
            setDoc(doc(db, "users", user.uid), {
                customURL: newUrl,
            }, { merge: true })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (selectedFile) {
            const photoType = selectedFile.type.replace("image/", "")
            const imageRef = ref(storage, `${user.uid}/custom.${photoType}`)
            uploadBytes(imageRef, selectedFile)
                .then(() => { getDownloadLink(photoType) })
                .then(() => { addUrlToDocument() })
        } else {
            addUrlToDocument()
        }

        setOpen(false)

    }



    return (
        <div className="background">
            <div className="modal">
                    <div className="close-modal" onClick={() => {
                        setOpen(false)
                    }}>
                        <AiOutlineCloseSquare/>
                    </div>
                    <span>Add image:</span>
                    <form onSubmit={handleSubmit}>
                        <label style={{ width: "100px", borderRadius: 100, cursor: "pointer" }}>
                            {customPhoto && !selectedFile && <img src={customPhoto} alt="customPhoto"/>}
                            {selectedFile && <img src={preview} alt="preview" style={{ height: "80px", width: "80px", borderRadius: 100 }} />}
                            {!selectedFile && !customPhoto && <img src={ImgPlaceholder} alt="placeholder" style={{ height: "80px", width: "80px" }} />}
                            <input type="file" style={{ display: "none" }} onChange={handleChange} />
                        </label>
                        {customPhotoError && <p>Error: {customPhotoError}</p>}
                        {customUrl && (
                            <div className="fetch">
                                <h4>Current URL</h4>
                                <h2>{customUrl}</h2>
                            </div>
                        )}
                        <label>
                            {!customUrl && <span>Add custom URL:</span>}
                            {customUrl && <span>Edit custom URL:</span>}
                            <input type="text" value={newUrl} onChange={(e) => { setNewUrl(e.target.value) }} />
                        </label>
                        <button>Update</button>
                    </form>
            </div>
        </div>
    )
}
