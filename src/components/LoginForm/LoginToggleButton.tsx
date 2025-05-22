import {type JSX} from 'react';

interface LoginToggleButtonProps {
    isLoginFormVisible: boolean;
    onToggle: () => void;
}

const LoginToggleButton = ({isLoginFormVisible, onToggle}: LoginToggleButtonProps): JSX.Element => {
    return (
        <button onClick={onToggle} className="login-toggle-button">
            {isLoginFormVisible ? 'Cancel' : 'Login'}
        </button>
    );
};

export default LoginToggleButton;
