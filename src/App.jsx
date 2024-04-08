import './App.css'
import Navigation from './components/Navigation.jsx';
import {MainContextProvider} from "./Context/MainContext.jsx";

function App() {
    return (
        <MainContextProvider>
            <Navigation/>
        </MainContextProvider>
    );
}

export default App
