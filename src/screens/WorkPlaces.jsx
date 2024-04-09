import Sidebar from "../components/Sidebar";
import "../CSS/Home.css";
import WorkArea from "../components/workArea";

function WorkPlaces() {
  return (
    <div className="home">
      <Sidebar />
      <div className="main-content">
        <h1>Work palace management screen!</h1>
        <WorkArea />
      </div>
    </div>
  );
}

export default WorkPlaces;
