import './App.css'
import Navigation from './components/Navigation.jsx';
import {MainContextProvider} from "./Context/MainContext.jsx";
import { NotificationProvider } from './Context/NotificationContext.jsx';

function App() {
    return (
        <MainContextProvider>
            <NotificationProvider> 
                <Navigation/>
            </NotificationProvider>
        </MainContextProvider>
    );
}

export default App
