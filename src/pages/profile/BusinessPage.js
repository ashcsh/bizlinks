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
                <div id="page_container">
                    <div id="business_left">
                        <img src={logo} alt="logo" />
                        <span>{name}</span>
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
                        <button className="signup-btn" onClick={handleClick}>Edit Information</button>
                    </div>
                    <div id="business_right">
                        <div id="description">
                            <h3> {bdescription}</h3>
                        </div>
                        <div id="button-div">
                            <a href={website}>
                                <button className="signup-btn">Visit Website</button>
                            </a>
                        </div>
                    </div>
                </div>
            )}
            {editMode && (
                <SetupBusinessPage
                    editMode={editMode}
                    setEditMode={setEditMode}
                    businessInfo={businessInfo}
                />
            )}
        </>
    )
}
