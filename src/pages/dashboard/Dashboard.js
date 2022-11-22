//styles
import "./Dashboard.css"

//hooks
import { useGetCollection } from '../../hooks/useGetCollection'

//react
import { useState } from "react"

//components
import AllProfiles from './AllProfiles'

export default function Dashboard() {
  //get doc
  const { documents } = useGetCollection("business")

  //search by name variable
  const [name, setName] = useState(null)

  return (
    <div id="dashboard_container">
      <div id="search-container">
        <input
          type="text"
          placeholder="Search By Company Name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <AllProfiles profile={documents} bName={name} />
    </div>
  )
}
