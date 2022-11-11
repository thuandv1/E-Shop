import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <div>
            <Link to={'/'}>Home</Link>
            <Link to={'/shop'}>Shop</Link>
            <Link to={'/blog'}>Blog</Link>
            <Link to={'/about'}>About</Link>
            <Link to={'/contact'}>Contact</Link>
            <Link to={'/cart'}>Cart</Link>
            <Link to={'/login'}>Login</Link>
        </div>
    )
}

export default Header
