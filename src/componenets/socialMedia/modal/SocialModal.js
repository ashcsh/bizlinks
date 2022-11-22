import "./Modal.css"
import { useState } from 'react'

import { AiOutlineCloseSquare } from "react-icons/ai"

export default function SocialModal({ url, updateUrl, dataType, collection, socialType, setOpen, editMode }) {

    const [newData, setNewData] = useState(url)

    const handleFakeSubmit = (e) => {
        e.preventDefault()
        setOpen(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await updateUrl(collection, socialType, newData)
        setOpen(false)
    }
    return (
        <div className="background">
            <div className="modal">
                <div className="close-modal" onClick={handleFakeSubmit}>
                    <AiOutlineCloseSquare/>
                </div>
                {url !== null && (
                    <div className="fetch" style={{marginBottom: 20}}>
                        {editMode &&
                            <h4>Current {`${dataType}`}</h4>
                        }
                        <h2 >{url}</h2>
                    </div>
                )}
                {editMode && (
                    <form onSubmit={handleSubmit}>
                        <label>
                            {url === null && <span>Add {`${dataType}`}:</span>}
                            {url !== null && <span>Edit {`${dataType}`}:</span>}
                            <input type={`${dataType}`} value={newData} onChange={(e) => setNewData(e.target.value)} />
                        </label>
                        <button>Update</button>
                    </form>
                )}
            </div>
        </div>
    )
}
