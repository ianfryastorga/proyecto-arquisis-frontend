import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import LoginButton from '../Forms/LogInButton';
import LogoutButton from '../Forms/LogOutButton';
import SignupButton from '../Forms/SignUpButton';
import ProfileButton from '../Profile/ProfileButton';
import { useAuth0 } from "@auth0/auth0-react";
import Heartbeat from '../JobsMaster/Heartbeat';

const Navbar = () => {
    const navigate = useNavigate();
    const { isLoading, isAuthenticated, user } = useAuth0();

    const [noBg, addBg] = useState('navBarTwo');
    const addBgColor = () => {
        if (window.scrollY >= 10) {
            addBg('navBarTwo navbar_With_Bg');
        } else {
            addBg('navBarTwo')
        }
    }
    window.addEventListener('scroll', addBgColor)

    if (isLoading) {
        return <div></div>;
    }
    
    let roles = null;

    if (user) {
        const namespace = 'user';
        roles = user[`${namespace}/roles`] || [];
    }

    return (
        <div className='navBar flex'>
            <div className={noBg}>
                <div className="navBarMenu">
                    <ul className="menu flex">
                        <li onClick={()=>{navigate("/")}} className="listItem">Home</li>
                        <li onClick={()=>{navigate("/flights")}} className="listItem">Oferta de vuelos</li>
                        {isAuthenticated && !roles.includes('admin') && 
                        <li onClick={()=>{navigate("/reservations")}} className="listItem">Mis compras</li>}
                        {isAuthenticated && !roles.includes('admin') && 
                        <li onClick={()=>{navigate("/recommendations")}} className="listItem">Recomendaciones</li>}
                        {isAuthenticated && roles.includes('admin') && 
                        <li onClick={()=>{navigate("/admin")}} className="listItem">Administración</li>}
                    </ul>
                </div>
                <div className='menu flex'> 
                    {isAuthenticated && < Heartbeat />}
                    <ProfileButton/>
                    <LoginButton/>
                    <LogoutButton/>
                    <SignupButton/>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
