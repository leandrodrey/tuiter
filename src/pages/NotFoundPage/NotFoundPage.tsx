import {type JSX} from "react";
import {useNavigate} from "react-router-dom";
import {TuiterLogo, SubmitButton} from "../../components/UI";

const NotFound = (): JSX.Element => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 text-white">
            <div className="w-full max-w-md text-center">
                <TuiterLogo className="h-16 w-16 sm:h-20 sm:w-20 mx-auto mb-6 text-blue-400" />

                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-blue-500">404</h1>
                    <p className="text-xl sm:text-2xl mt-4 text-gray-300">This page doesn't exist</p>
                    <p className="text-gray-400 mt-2">Please check the URL or go back to the homepage.</p>
                </div>

                <SubmitButton
                    onClick={handleGoHome}
                    type="button"
                    className="w-auto px-6 py-3 mt-0"
                >
                    Back to Home
                </SubmitButton>
            </div>
        </div>
    );
};

export default NotFound;
