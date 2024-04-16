import { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // remove navBar on small screens
  const [active, setActive] = useState('navBarMenu');
  const showNavBar = () => {
    setActive('navBarMenu showNavBar');
  }
  const removeNavBar = () => {
    setActive('navBarMenu');
  }

  // add bgcolor on second nabVar
  const [noBg, addBg] = useState('navBarTwo');
  const [btnBg, addBtnBg] = useState('btnNoBg');
  const addBgColor = () => {
    if (window.scrollY >= 10) {
      addBg('navBarTwo navbar_With_Bg');
      addBtnBg('btnNoBg btnBg');
    } else {
      addBg('navBarTwo')
      addBtnBg('btnNoBg');
    }
  }
  window.addEventListener('scroll', addBgColor)

  const signUp = () => {
    navigate('/signup');
  }

  return (
    <div className='navBar flex'>
      <div className={noBg}>
        <div className={active}>
          <ul className="menu flex">
            <li onClick={removeNavBar} className="listItem">Home</li>
            <li onClick={removeNavBar} className="listItem">Acerca de</li>
            <li onClick={removeNavBar} className="listItem">Oferta de vuelos</li>
            <li onClick={removeNavBar} className="listItem">Destinos</li>
          </ul>
        </div>
        <div className='flex'> 
          <a className={btnBg} href="/signin"> Sign in </a>
          <button onClick={signUp} className='btn btnTwo'>Sign up</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
