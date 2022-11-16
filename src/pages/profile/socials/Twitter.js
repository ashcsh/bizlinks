//style
import "./UserSocials.css"

//assets
import DTwitter from "../../../assets/social_svg/Dtwitter.svg"
import ATwitter from "../../../assets/social_svg/Twitter.svg"

//firebase
import { doc, setDoc } from "firebase/firestore"
import { db } from "../../../firebase/config"

//react
import { useState, useEffect } from "react"

//context
import { useAuthContext } from "../../../hooks/useAuthContext"

//custom hooks
import { useGetDocument } from "../../../hooks/useGetDocument"

export default function Twitter({ props }) {

    const { user } = useAuthContext()

    const [open, setOpen] = useState(false)

    const [url, setUrl] = useState(null)

    const { document } = useGetDocument(props, user.uid);

    useEffect(() => {
        if (document) {
            setUrl(document.twitter)
        }
    }, [document])

    const [newUrl, setNewUrl] = useState(url)

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(e)
        if (newUrl === "") {
            await setDoc(doc(db, props, user.uid), {
                twitter: null
            }, {merge: true})
        } else {
            await setDoc(doc(db, props, user.uid), {
                twitter: newUrl
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
                    <img src={ATwitter} alt="social-media-icon" />
                </label>

            )}
            {!url && (
                <label onClick={() => { setOpen(true) }}>
                    <img src={DTwitter} alt="social-media-icon" />

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
                                        <h4>Current Twitter</h4>
                                        <h2>{url}</h2>
                                    </div>
                                )}
                            <form onSubmit={handleSubmit}>
                                <label>
                                    {!url && <span>Add Twitter Url:</span>}
                                    {url && <span>Edit Twitter:</span>}
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
