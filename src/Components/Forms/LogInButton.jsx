import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

    if (!isLoading && !isAuthenticated) {
        return <button className={'btn btnTwo'} onClick={() => loginWithRedirect()}>Log In</button>;
    }
};

export default LoginButton;