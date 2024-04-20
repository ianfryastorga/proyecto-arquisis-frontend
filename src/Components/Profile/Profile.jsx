import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
    const { loginWithRedirect, user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return (<div>Loading ...</div>);
    }
    if (!isLoading && !isAuthenticated) {
        return loginWithRedirect();
    }
    return (
        isAuthenticated && (
            <div className="profile">
                <div className="profileContainer">
                    <img className="profileImage" src={user.picture} alt={user.name} />
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                </div>
            </div>
        )
    );
};

export default Profile;