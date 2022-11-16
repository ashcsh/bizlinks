//style
import "./UserSocials.css"

//assets
import DPhone from "../../../assets/social_svg/Dphone.svg"
import APhone from "../../../assets/social_svg/Phone.svg"

//firebase
import { doc, setDoc } from "firebase/firestore"
import { db } from "../../../firebase/config"

//react
import { useState, useEffect } from "react"

//context
import { useAuthContext } from "../../../hooks/useAuthContext"

//custom hooks
import { useGetDocument } from "../../../hooks/useGetDocument"

export default function Phone({ props }) {

    const { user } = useAuthContext()

    const [open, setOpen] = useState(false)

    const [phone, setPhone] = useState(null)

    const { document } = useGetDocument(props, user.uid);

    useEffect(() => {
        if (document) {
            setPhone(document.phone)
        }
    }, [document])

    const [newPhone, setNewPhone] = useState(phone)

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(e)
        if (newPhone === "") {
            await setDoc(doc(db, props, user.uid), {
                phone: null
            }, {merge: true})
        } else {
            await setDoc(doc(db, props, user.uid), {
                phone: newPhone
            }, {merge: true})
        }
        setOpen(false)
        setNewPhone("")
    }

    const handleFakeSubmit = (e) => {
        e.preventDefault()
        setNewPhone("")
        setOpen(false)
    }

    return (
        <>
            {phone && (

                <label onClick={() => { setOpen(true) }}>
                    <img src={APhone} alt="social-media-icon" />
                </label>

            )}
            {!phone && (
                <label onClick={() => { setOpen(true) }}>
                    <img src={DPhone} alt="social-media-icon" />

                </label>
            )}
            {open &&
                <div className="background">
                    <div className="modal">
                        <>
                            <div className="close-modal" onClick={handleFakeSubmit}>
                                <span>x</span>
                            </div>
                                {phone && (
                                    <div className="fetch">
                                        <h4>Current Phone Number</h4>
                                        <h2>{phone}</h2>
                                    </div>
                                )}
                            <form onSubmit={handleSubmit}>
                                <label>
                                    {!phone && <span>Add Phone Number:</span>}
                                    {phone && <span>Edit Phone Number:</span>}
                                    <input type="number" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} />
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
