import type {JSX} from "react";
import LoginForm from "../components/Login/LoginForm";
import "./HomePage.css";
import {useAuthContext} from "../context/useAuthContext.ts";

const HomePage = (): JSX.Element => {
    const {userToken} = useAuthContext();

    return (
        <div className="home-container">
            <div className="login-wrapper">
                <LoginForm />
            </div>
            <div className="content">
                <h1>Bienvenido a Tuiter</h1>
                <p>Esta es la página de inicio de nuestra aplicación.</p>
                {userToken}
            </div>
        </div>
    )
}

export default HomePage;
