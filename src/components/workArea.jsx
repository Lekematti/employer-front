import { useEffect } from "react";
import workAreaHooks from "../hooks/workAreaHooks";

function WorkArea() {
  const { getWorkAreas } = workAreaHooks();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getWorkAreas();
      console.log(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Work Area</h1>
    </div>
  );
}
export default WorkArea;