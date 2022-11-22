import APhone from "../../assets/social_svg/Phone.svg"
import DPhone from "../../assets/social_svg/Dphone.svg"
import SocialModal from "./modal/SocialModal"

import { useState } from "react"

export default function Phone({ url, updateUrl, dataType, collection, socialType, editMode }) {
    const [open, setOpen] = useState(false)
    if ( url === undefined){
        url = null;
    }
    return (
        <div>
        <>
            {url !== null && (
                <label onClick={() => { setOpen(true) }}>
                    <img src={APhone} alt="social-media-icon" />
                </label>
            )}
            {url === null && (
                <label onClick={() => { setOpen(true) }}>
                    <img src={DPhone} alt="social-media-icon" />
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
