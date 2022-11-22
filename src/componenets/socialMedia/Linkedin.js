import ALinkedin from "../../assets/social_svg/Linkedin.svg"
import DLinkedin from "../../assets/social_svg/Dlinkedin.svg"
import SocialModal from "./modal/SocialModal"
 
import { useState } from "react"

export default function Linkedin({ url, updateUrl, dataType, collection, socialType, editMode }) {
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
                            <img src={ALinkedin} alt="social-media-icon" />
                        </label>
                    )}
                    {url === null && (
                        <label onClick={() => { setOpen(true) }}>
                            <img src={DLinkedin} alt="social-media-icon" />
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
                                <img src={ALinkedin} alt="social-media-icon" />
                        </label>
                            </a>
                    )}
                    {url === null && (
                        <label>
                            <img src={DLinkedin} alt="social-media-icon" />
                        </label>
                    )}
                </>
            )}
        </>
    </div>
    )
}
