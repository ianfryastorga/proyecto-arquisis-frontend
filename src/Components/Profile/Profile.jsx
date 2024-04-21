import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
    const { user, isLoading, isAuthenticated, loginWithRedirect } = useAuth0();

    if (!isLoading && !isAuthenticated) {
        return loginWithRedirect();
    }

    return (
        <div className="profile">
            <div className="profileContainer">
                <img className="profileImage" src={user.picture} alt={user.name} />
                <h2>{user.name}</h2>
                <p>{user.email}</p>
            </div>
            <div className="row">
                <pre className="col-12 text-light bg-dark p-4">
                    {JSON.stringify(user, null, 2)}
                </pre>
            </div>
        </div>
    );
};

export default Profile;