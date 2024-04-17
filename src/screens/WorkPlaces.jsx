import Sidebar from "../components/Sidebar";
import "../CSS/WorkPlaces.css";
import WorkAreaMap from "../components/WorkAreaMap.jsx";
import WorkAreaForm from "../components/WorkAreaForm.jsx";
import WorkArea from "../components/workArea.jsx";

function WorkPlaces() {
  return (
      <div className="work-places">
          <div className="sidebar">
            <Sidebar />
          </div>
          <div className="leaflet-container">
            <WorkAreaMap />
          </div>
          <WorkAreaForm />
        <WorkArea />
      </div>
  );
}

export default WorkPlaces;
