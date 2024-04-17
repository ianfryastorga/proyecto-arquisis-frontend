import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import LoginButton from '../Forms/LogInButton';
import LogoutButton from '../Forms/LogOutButton';
import ProfileButton from '../Profile/ProfileButton';

const Navbar = () => {
    const navigate = useNavigate();

    // add bgcolor on second nabVar
    const [noBg, addBg] = useState('navBarTwo');
    const addBgColor = () => {
        if (window.scrollY >= 10) {
            addBg('navBarTwo navbar_With_Bg');
        } else {
            addBg('navBarTwo')
        }
    }
    window.addEventListener('scroll', addBgColor)

    return (
        <div className='navBar flex'>
            <div className={noBg}>
                <div className="navBarMenu">
                    <ul className="menu flex">
                        <li onClick={()=>{navigate("/home")}} className="listItem">Home</li>
                        <li onClick={()=>{navigate("/signin")}} className="listItem">Acerca de</li>
                        <li onClick={()=>{navigate("/home")}} className="listItem">Oferta de vuelos</li>
                        <li onClick={()=>{navigate("/home")}} className="listItem">Destinos</li>
                    </ul>
                </div>
                <div className='flex'> 
                    <ProfileButton/>
                    <LoginButton/>
                    <LogoutButton/>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
