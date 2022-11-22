import AInstagram from "../../assets/social_svg/Instagram.svg"
import DInstagram from "../../assets/social_svg/Dinstagram.svg"
import SocialModal from "./modal/SocialModal"
 
import { useState } from "react"

export default function Instagram({ url, updateUrl, dataType, collection, socialType, editMode }) {
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
                            <img src={AInstagram} alt="social-media-icon" />
                        </label>
                    )}
                    {url === null && (
                        <label onClick={() => { setOpen(true) }}>
                            <img src={DInstagram} alt="social-media-icon" />
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
                                <img src={AInstagram} alt="social-media-icon" />
                        </label>
                            </a>
                    )}
                    {url === null && (
                        <label>
                            <img src={DInstagram} alt="social-media-icon" />
                        </label>
                    )}
                </>
            )}
        </>
    </div>
    )
}
