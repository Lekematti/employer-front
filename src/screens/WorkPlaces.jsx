import Sidebar from "../components/Sidebar";
import "../CSS/WorkPlaces.css";
import WorkAreaMap from "../components/WorkAreaMap.jsx";

function WorkPlaces() {
  return (
      <div className="work-places">
            <Sidebar />
          <div className="work-area-map">
            <WorkAreaMap />
          </div>
        {/*<WorkArea />*/}
      </div>
  );
}

export default WorkPlaces;
