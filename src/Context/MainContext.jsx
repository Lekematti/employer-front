import React, {useState} from "react";
import PropTypes from "prop-types";

const MainContext = React.createContext(undefined);

const MainContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [isLogged, setIsLogged] = useState(false);

    return (
        <MainContext.Provider
            value={{
                user,
                setUser,
                isLogged,
                setIsLogged}}>
            {children}
        </MainContext.Provider>
    );
}
MainContextProvider.propTypes = {
    children: PropTypes.node
}
export {MainContext, MainContextProvider};