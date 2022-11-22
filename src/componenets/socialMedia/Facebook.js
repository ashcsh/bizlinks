import AFacebook from "../../assets/social_svg/Facebook.svg"
import DFacebook from "../../assets/social_svg/Dfacebook.svg"
import SocialModal from "./modal/SocialModal"

import { useState } from "react"

export default function Facebook({ url, updateUrl, dataType, collection, socialType, editMode }) {
    const [open, setOpen] = useState(false)
    if ( url === undefined){
        url = null;
    }
    return (
        <div>
            <>
                {editMode && (
                    <>
                        {url !== null && (
                            <label onClick={() => { setOpen(true) }}>
                                <img src={AFacebook} alt="social-media-icon" />
                            </label>
                        )}
                        {url === null && (
                            <label onClick={() => { setOpen(true) }}>
                                <img src={DFacebook} alt="social-media-icon" />
                            </label>
                        )}
                        {open && (
                            <SocialModal
                                url={url}
                                updateUrl={updateUrl}
                                dataType={dataType}
                                setOpen={setOpen}
                                collection={collection}
                                socialType={socialType}
                                editMode={true}
                            />
                        )}
                    </>
                )}
                {!editMode && (
                    <>
                        {url !== null && (
                                <a href={url}>
                            <label>
                                    <img src={AFacebook} alt="social-media-icon" />
                            </label>
                                </a>
                        )}
                        {url === null && (
                            <label>
                                <img src={DFacebook} alt="social-media-icon" />
                            </label>
                        )}
                    </>
                )}
            </>
        </div>
    )
}
