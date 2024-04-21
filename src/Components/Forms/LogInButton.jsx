import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    if (!isAuthenticated) {
        return <button className={'btn btnTwo noBg'} onClick={() => loginWithRedirect()}>Ingresar</button>;
    }
};

export default LoginButton;