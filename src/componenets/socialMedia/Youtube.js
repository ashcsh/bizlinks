import AYoutube from "../../assets/social_svg/Youtube.svg"
import DYoutube from "../../assets/social_svg/Dyoutube.svg"
import SocialModal from "./modal/SocialModal"
 
import { useState } from "react"

export default function Youtube({ url, updateUrl, dataType, collection, socialType, editMode }) {
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
                            <img src={AYoutube} alt="social-media-icon" />
                        </label>
                    )}
                    {url === null && (
                        <label onClick={() => { setOpen(true) }}>
                            <img src={DYoutube} alt="social-media-icon" />
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
                                <img src={AYoutube} alt="social-media-icon" />
                        </label>
                            </a>
                    )}
                    {url === null && (
                        <label>
                            <img src={DYoutube} alt="social-media-icon" />
                        </label>
                    )}
                </>
            )}
        </>
    </div>
    )
}
