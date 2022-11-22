//styles
import "./BusinessPage.css"

//react
import { useState, useEffect } from "react"

//hooks
import { useGetDocument } from "../../hooks/useGetDocument"
import { useAuthContext } from "../../hooks/useAuthContext"

//components
import SetupBusinessPage from "./SetupBusinessPage"

//icons
import { IoBusinessSharp } from "react-icons/io5"
import { IoLocationOutline } from "react-icons/io5"
import { AiOutlineCloseSquare } from "react-icons/ai"


export default function BusinessPage() {

    //get userId and business doc
    const { user } = useAuthContext()
    const { document } = useGetDocument("business", user.uid)

    //state
    const [logo, setLogo] = useState(null)
    const [name, setName] = useState(null)
    const [industry, setIndustry] = useState(null)
    const [location, setLocation] = useState(null)
    const [bdescription, setBdescription] = useState(null)
    const [website, setWebsite] = useState(null)
    const [editMode, setEditMode] = useState(null)
    const [businessInfo, setBusinessInfo] = useState({})
    const [viewDescription, setViewDescription] = useState(false)

    //set state to match business document
    useEffect(() => {
        if (document) {
            setLogo(document.logo)
            setName(document.name)
            setIndustry(document.industry)
            setLocation(document.location)
            setBdescription(document.bdescription)
            setWebsite(document.website)
        }
    }, [document])

    //activate edit mode
    const handleClick = () => {
        setBusinessInfo({
            ...businessInfo,
            logo,
            name,
            industry,
            location,
            bdescription,
            website
        })
        setEditMode(true)
    }

    return (
        <>
            {!editMode && (
                <>
                    <div id="business-page">
                        <div id="business-main">
                            <img src={logo} alt="logo" />
                            <h2>{name}</h2>
                            <ul>
                                <li>
                                    <IoBusinessSharp />
                                    <span> {industry}</span>
                                </li>
                                <li>
                                    <IoLocationOutline />
                                    <span> {location}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div id="button-div">
                        <button onClick={() => { setViewDescription(true) }}>View Description</button>
                        <button onClick={handleClick}>Edit Information</button>
                        <a href={website}>
                            <button >Visit Website</button>
                        </a>
                    </div>
                </>
            )}
            {editMode && (
                <SetupBusinessPage
                    editMode={editMode}
                    setEditMode={setEditMode}
                    businessInfo={businessInfo}
                />
            )}
            {viewDescription && (
                <div className="background">
                    <div className="modal">
                    <div className="close-modal" onClick={()=>setViewDescription(false)}>
                    <AiOutlineCloseSquare/>
                </div>
                        <h3>{bdescription}</h3>
                    </div>

                </div>
            )}
        </>
    )
}
