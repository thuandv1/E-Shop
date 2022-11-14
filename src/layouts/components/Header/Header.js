import { faBagShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'

import images from 'assets/images'
import LoginModal from 'components/Login'
import { LoginContext } from 'Context/LoginContext'
import styles from './Header.module.scss'

const cx = classNames.bind(styles)

function Header() {
    const location = useLocation()
    const { userLogin } = useContext(LoginContext)

    return (
        <header className={cx('header')} id="header">
            <Link className={cx('logo')} to={'/'}>
                <img src={images.logo} alt="" />
            </Link>
            <ul className={cx('navbar')}>
                <li className={cx('navbar__item', location.pathname === '/' && 'active')}>
                    <Link to={'/'} className={cx('navbar__link')}>
                        Home
                    </Link>
                </li>
                <li className={cx('navbar__item', location.pathname.includes('/shop') && 'active')}>
                    <Link to={'/shop'} className={cx('navbar__link')}>
                        Shop
                    </Link>
                </li>
                <li className={cx('navbar__item', location.pathname.includes('/blog') && 'active')}>
                    <Link to={'/blog'} className={cx('navbar__link')}>
                        Blog
                    </Link>
                </li>
                <li className={cx('navbar__item', location.pathname.includes('/about') && 'active')}>
                    <Link to={'/about'} className={cx('navbar__link')}>
                        About
                    </Link>
                </li>
                <li className={cx('navbar__item', location.pathname.includes('/contact') && 'active')}>
                    <Link to={'/contact'} className={cx('navbar__link')}>
                        Contact
                    </Link>
                </li>
                <li className={cx('navbar__item', location.pathname.includes('/cart') && 'active')}>
                    <Link to={'/cart'} className={cx('navbar__link')}>
                        <FontAwesomeIcon icon={faBagShopping} />
                    </Link>
                </li>
                <li className={cx('navbar__item')}>
                    <LoginModal />
                </li>
            </ul>
        </header>
    )
}

export default Header
