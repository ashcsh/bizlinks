import ATwitter from "../../assets/social_svg/Twitter.svg"
import DTwitter from "../../assets/social_svg/Dtwitter.svg"
import SocialModal from "./modal/SocialModal"
 
import { useState } from "react"

export default function Twitter({ url, updateUrl, dataType, collection, socialType, editMode }) {
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
                            <img src={ATwitter} alt="social-media-icon" />
                        </label>
                    )}
                    {url === null && (
                        <label onClick={() => { setOpen(true) }}>
                            <img src={DTwitter} alt="social-media-icon" />
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
                                <img src={ATwitter} alt="social-media-icon" />
                        </label>
                            </a>
                    )}
                    {url === null && (
                        <label>
                            <img src={DTwitter} alt="social-media-icon" />
                        </label>
                    )}
                </>
            )}
        </>
    </div>
    )
}
