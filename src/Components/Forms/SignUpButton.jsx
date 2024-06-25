import { useAuth0 } from '@auth0/auth0-react';

const SignupButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    if (!isAuthenticated) {
        return (
            <button
                className="btn btnTwo"
                onClick={() =>
                    loginWithRedirect({authorizationParams: {screen_hint: 'signup'}})
                }
            >
                Registrarse
            </button>
        );
    }
};

export default SignupButton;