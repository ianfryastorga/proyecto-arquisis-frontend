import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
    const { logout, isAuthenticated, isLoading } = useAuth0();

    console.log(isAuthenticated);

    if (!isLoading && isAuthenticated) {
        return (
            <button className='bg1 btn btnTwo' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                Log Out
            </button>
        );
    }
};

export default LogoutButton;