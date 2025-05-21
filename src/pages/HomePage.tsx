import type {JSX} from "react";
import LoginComponent from "../components/Login/LoginComponent";
import "./HomePage.css";

const HomePage = (): JSX.Element => {
    return (
        <div className="home-container">
            <div className="login-wrapper">
                <LoginComponent />
            </div>
            <div className="content">
                <h1>Bienvenido a Tuiter</h1>
                <p>Esta es la página de inicio de nuestra aplicación.</p>
            </div>
        </div>
    )
}

export default HomePage;
