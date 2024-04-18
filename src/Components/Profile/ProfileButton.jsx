import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const ProfileButton = () => {
    const navigate = useNavigate();
    const { isAuthenticated, isLoading } = useAuth0();
    console.log("1");
    console.log(isLoading);
    console.log(isAuthenticated);
    console.log("2");


    if (!isLoading && isAuthenticated) {
        return <button className={'btn btnTwo bg2'} onClick={() => {navigate("/profile")}}>Profile</button>;
    }
};

export default ProfileButton;