import '../CSS/Sidebar.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBuilding, faClock, faPlus, faUser, faUsersCog} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";


function Sidebar() {
    const navigate = useNavigate();

    return (
        <div className="sidebar">
            <h3>Sidebar</h3>
            <button onClick={() => navigate('/home')}>WPT</button>
            <div className="spacer"></div>
            <button onClick={() => navigate('/add-roles')}><FontAwesomeIcon icon={faPlus}/> Add Roles</button>
            <div className="spacer"></div>
            <button onClick={() => navigate('/manage-roles')}><FontAwesomeIcon icon={faUsersCog}/> Manage Roles</button>
            <div className="spacer"></div>
            <button onClick={() => navigate('/manage-users')}><FontAwesomeIcon icon={faUser}/> Manage Users</button>
            <div className="spacer"></div>
            <button onClick={() => navigate('/manage-work-hours')}><FontAwesomeIcon icon={faClock}/> Manage Work Hours
            </button>
            <div className="spacer"></div>
            <button onClick={() => navigate('/manage-work-places')}><FontAwesomeIcon icon={faBuilding}/> Manage Work
                Places
            </button>
        </div>

    )
        ;
}

export default Sidebar;