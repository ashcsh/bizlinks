//styles
import "./Dashboard.css"

//hooks
import { useGetCollection } from '../../hooks/useGetCollection'

//components
import AllProfiles from './AllProfiles'

export default function Dashboard() {
  const { documents } = useGetCollection("business")
  return (
    <div id="dashboard_container">
      <h2> Dashboard </h2>
        {documents && <AllProfiles profile={documents} />}
    </div>
  )
}
