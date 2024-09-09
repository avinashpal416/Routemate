import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import Logo from '../Assets/logo.png';


const Header = () => {



  return (
    <div>
      <header>
        <Link to='/' className='logo'>
        <img onClick={()=> <NavLink to='/' className='link'>Home</NavLink>} src={Logo} alt='Logo' />
        <span className='anime'><b>Routemate</b></span>
        </Link>
<nav className='navigation'>
  <NavLink to='/' className='link'>Home</NavLink>
  <NavLink to='/product' className='link'>Product</NavLink>
  <NavLink to='/contact' className='link'>Contact</NavLink>
  <NavLink to='/login' className='link'>Login</NavLink>

</nav>

      </header>
    </div>
  )
}

export default Header