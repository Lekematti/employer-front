import '../CSS/Sidebar.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBuilding, faClock, faPlus, faUser, faUsersCog} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";


function Sidebar() {
    const navigate = useNavigate();

    return (
        <div className="sidebar">
            
            <button onClick={() => navigate('/home')} className="wpt-button">WPT</button> 
            <div className="spacer"></div> 
            <button onClick={() => navigate('/add-roles')}><FontAwesomeIcon icon={faPlus} style={{ fontSize: '30px' }}/> Add roles</button>
            <div className="spacer"></div>
            <button onClick={() => navigate('/manage-roles')}><FontAwesomeIcon icon={faUsersCog} style={{ fontSize: '30px' }}/> Manage roles</button>
            <div className="spacer"></div>
            <button onClick={() => navigate('/manage-users')}><FontAwesomeIcon icon={faUser} style={{ fontSize: '30px' }}/> Manage users</button>
            <div className="spacer1"></div>
            <button onClick={() => navigate('/manage-work-hours')}><FontAwesomeIcon icon={faClock} style={{ fontSize: '30px' }}/> Manage work hours
            </button>
            <div className="spacer"></div>
            <div className="spacer"></div>
            <button onClick={() => navigate('/manage-work-places')}><FontAwesomeIcon icon={faBuilding} style={{ fontSize: '30px' }}/> Manage workplaces
            </button>
        </div>

    )
        ;
}

export default Sidebar;