import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const ProfileButton = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth0();


    if ( isAuthenticated ) {
        return <button className={'listItem btn btnTwo noBg'} onClick={() => {navigate("/profile")}}>Perfil</button>;
    }
};

export default ProfileButton;