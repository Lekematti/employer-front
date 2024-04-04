import Login from "./Login.jsx";
import Register from "./Register.jsx";
import {useState} from "react";


function LoginRegister() {
    const [isLoginVisible, setIsLoginVisible] = useState(true);

    return (
        <>
            {isLoginVisible ? (
                <>
                    <h1>Login</h1>
                    <div>
                        <Login/>
                    </div>
                </>
            ) : (
                <>
                    <h1>Register</h1>
                    <div>
                        <Register/>
                    </div>
                </>
            )}
            <div className="spacer"></div>
            <button onClick={() => setIsLoginVisible(!isLoginVisible)}>
                {isLoginVisible ? 'Go to Register' : 'Go to Login'}
            </button>
        </>
    );
}

export default LoginRegister