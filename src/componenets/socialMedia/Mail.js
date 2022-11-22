import AMail from "../../assets/social_svg/Mail.svg"
import DMail from "../../assets/social_svg/Dmail.svg"
import SocialModal from "./modal/SocialModal"

import { useState } from "react"

export default function Mail({ url, updateUrl, dataType, collection, socialType, editMode }) {
    const [open, setOpen] = useState(false)
    if ( url === undefined){
        url = null;
    }
    return (
        <div>
            <>
                {url !== null && (
                    <label onClick={() => { setOpen(true) }}>
                        <img src={AMail} alt="social-media-icon" />
                    </label>
                )}
                {url === null && (
                    <label onClick={() => { setOpen(true) }}>
                        <img src={DMail} alt="social-media-icon" />
                    </label>
                )}
                {editMode && (
                    <>
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
                {!editMode && url &&(
                    <>
                        {open && (
                            <SocialModal
                                url={url}
                                updateUrl={updateUrl}
                                dataType={dataType}
                                setOpen={setOpen}
                                collection={collection}
                                socialType={socialType}
                                editMode={false}
                            />
                        )}
                    </>
                )}
            </>
        </div>
    )
}
