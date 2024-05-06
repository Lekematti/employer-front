import Sidebar from "../components/Sidebar";
import "../CSS/WorkPlaces.css";
import CreateWorkArea from "../components/CreateWorkArea.jsx";
import WorkArea from "../components/workArea.jsx";

function WorkPlaces() {
  return (
      <div className="work-places">
          
          <CreateWorkArea />
        {/*<WorkArea />*/}
      </div>
  );
}

export default WorkPlaces;
