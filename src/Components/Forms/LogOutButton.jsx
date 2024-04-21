import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();

    if (isAuthenticated) {
        return (
            <button className='bg1 btn btnTwo' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                Cerrar sesión
            </button>
        );
    }
};

export default LogoutButton;