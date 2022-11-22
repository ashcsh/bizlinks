//styles
import "./AllProfiles.css"

//icons
import { IoBusinessSharp } from "react-icons/io5"
import { IoLocationOutline } from "react-icons/io5"

//router
import { Link } from "react-router-dom"

export default function AllProfiles({ profile, bName }) {
    return (
        <div className="profile_container">
            {profile.length === 0 && <p>No profiles yet!</p>}
            {profile.map((doc) => {
                return (
                    <>
                        {!bName && (
                            <>
                                {doc.publish && doc.name && (
                                        <Link to={`/profile/${doc.id}`} key={doc.id}>
                                            <img style={{ width: "100px", height: "100px", borderRadius: 100 }} src={doc.logo} alt="sadas" />
                                            <h2>{doc.name}</h2>
                                            <h2></h2>
                                            <ul style={{ margin: 0, padding: 0, listStyleType: "none" }}>
                                                <li><IoBusinessSharp />{doc.industry}</li>
                                                <li><IoLocationOutline />{doc.location}</li>
                                            </ul>
                                        </Link>
                                    )
                                }
                            </>
                        )}
                        {bName && (
                            <>
                                {doc.publish && doc.name.toLowerCase().includes(bName.toLowerCase()) && (
                                        <Link to={`/profile/${doc.id}`} key={doc.id}>
                                            <img style={{ width: "100px", height: "100px", borderRadius: 100 }} src={doc.logo} alt="sadas" />
                                            <h2>{doc.name}</h2>
                                            <h2></h2>
                                            <ul style={{ margin: 0, padding: 0, listStyleType: "none" }}>
                                                <li><IoBusinessSharp />{doc.industry}</li>
                                                <li><IoLocationOutline />{doc.location}</li>
                                            </ul>
                                        </Link>
                                    )
                                }
                            </>
                        )}
                    </>

                )
            })
            }
        </div>
    )
}
