//style
import "./UserSocials.css"

//assets
import ATiktok from "../../../assets/social_svg/Dtiktok.svg"
import DTiktok from "../../../assets/social_svg/Tiktok.svg"

//firebase
import { doc, setDoc } from "firebase/firestore"
import { db } from "../../../firebase/config"

//react
import { useState, useEffect } from "react"

//context
import { useAuthContext } from "../../../hooks/useAuthContext"

//custom hooks
import { useGetDocument } from "../../../hooks/useGetDocument"

export default function Tiktok({ props }) {

    const { user } = useAuthContext()

    const [open, setOpen] = useState(false)

    const [url, setUrl] = useState(null)

    const { document } = useGetDocument(props, user.uid);

    useEffect(() => {
        if (document) {
            setUrl(document.tiktok)
        }
    }, [document])

    const [newUrl, setNewUrl] = useState(url)

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(e)
        if (newUrl === "") {
            await setDoc(doc(db, props, user.uid), {
                tiktok: null
            }, {merge: true})
        } else {
            await setDoc(doc(db, props, user.uid), {
                tiktok: newUrl
            }, {merge: true})
        }
        setOpen(false)
        setNewUrl("")
    }

    const handleFakeSubmit = (e) => {
        e.preventDefault()
        setNewUrl("")
        setOpen(false)
    }

    return (
        <>
            {url && (

                <label onClick={() => { setOpen(true) }}>
                    <img src={DTiktok} alt="social-media-icon" />
                </label>

            )}
            {!url && (
                <label onClick={() => { setOpen(true) }}>
                    <img src={ATiktok} alt="social-media-icon" />

                </label>
            )}
            {open &&
                <div className="background">
                    <div className="modal">
                        <>
                            <div className="close-modal" onClick={handleFakeSubmit}>
                                <span>x</span>
                            </div>
                                {url && (
                                    <div className="fetch">
                                        <h4>Current Tiktok</h4>
                                        <h2>{url}</h2>
                                    </div>
                                )}
                            <form onSubmit={handleSubmit}>
                                <label>
                                    {!url && <span>Add Tiktok Url:</span>}
                                    {url && <span>Edit Tiktok:</span>}
                                    <input type="url" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} />
                                </label>
                                <button>Update</button>
                            </form>
                        </>
                    </div>
                </div>
            }
        </>
    )
}
