//style
import "./UserSocials.css"

//assets
import DMail from "../../../assets/social_svg/Dmail.svg"
import AMail from "../../../assets/social_svg/Mail.svg"

//firebase
import { doc, setDoc } from "firebase/firestore"
import { db } from "../../../firebase/config"

//react
import { useState, useEffect } from "react"

//context
import { useAuthContext } from "../../../hooks/useAuthContext"

//custom hooks
import { useGetDocument } from "../../../hooks/useGetDocument"

export default function Mail({ props }) {

    const { user } = useAuthContext()

    const [open, setOpen] = useState(false)

    const [mail, setMail] = useState(null)

    const { document } = useGetDocument(props, user.uid);

    useEffect(() => {
        if (document) {
            setMail(document.mail)
        }
    }, [document])

    const [newMail, setNewMail] = useState(mail)

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(e)
        if (newMail === "") {
            await setDoc(doc(db, props, user.uid), {
                mail: null
            }, {merge: true})
        } else {
            await setDoc(doc(db, props, user.uid), {
                mail: newMail
            }, {merge: true})
        }
        setOpen(false)
        setNewMail("")
    }

    const handleFakeSubmit = (e) => {
        e.preventDefault()
        setNewMail("")
        setOpen(false)
    }

    return (
        <>
            {mail && (

                <label onClick={() => { setOpen(true) }}>
                    <img src={AMail} alt="social-media-icon" />
                </label>

            )}
            {!mail && (
                <label onClick={() => { setOpen(true) }}>
                    <img src={DMail} alt="social-media-icon" />

                </label>
            )}
            {open &&
                <div className="background">
                    <div className="modal">
                        <>
                            <div className="close-modal" onClick={handleFakeSubmit}>
                                <span>x</span>
                            </div>
                                {mail && (
                                    <div className="fetch">
                                        <h4>Current Email Address</h4>
                                        <h2>{mail}</h2>
                                    </div>
                                )}
                            <form onSubmit={handleSubmit}>
                                <label>
                                    {!mail && <span>Add Email:</span>}
                                    {mail && <span>Edit Email:</span>}
                                    <input type="email" value={newMail} onChange={(e) => setNewMail(e.target.value)} />
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
