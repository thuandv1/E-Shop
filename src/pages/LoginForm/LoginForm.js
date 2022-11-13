import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import images from 'assets/images'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import styles from './LoginForm.module.scss'

const cx = classNames.bind(styles)

function LoginForm() {
    return (
        <div style={{ backgroundImage: `url(${images.loginBgr})` }} className={cx('container')}>
            <div className={cx('form')}>
                <form action="">
                    <h1>Login</h1>
                    <div className={cx('form-action')}>
                        <label htmlFor="login-email">Email</label>
                        <div>
                            <input id="login-email" type="text" placeholder="Enter your email" />
                            <span>
                                <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                            </span>
                        </div>
                    </div>
                    <div className={cx('form-action')}>
                        <label htmlFor="login-password">Password</label>
                        <div>
                            <input id="login-password" type="password" placeholder="Enter your password" />
                            <span>
                                <FontAwesomeIcon className={cx('icon')} icon={faLock} />
                            </span>
                        </div>
                    </div>
                    <div className={cx('form__forgot')}>
                        <a>Forgot password?</a>
                    </div>
                    <button type="submit" className={cx('form-button')}>
                        LOGIN
                    </button>
                    <h4>Or Sign Up Using</h4>
                    <div className={cx('form-other')}>
                        <a className={cx('form-other__fb')}>
                            <i className={cx('fa-brands fa-facebook-f')}></i>
                        </a>
                        <a className={cx('form-other__gg')}>
                            <i className={cx('fa-brands fa-google')}></i>
                        </a>
                        <a className={cx('form-other__tw')}>
                            <i className="fa-brands fa-twitter"></i>
                        </a>
                    </div>
                    <h4>Or Sign Up Using</h4>
                    <Link to={'/register'} className={cx('form__signup')}>
                        SIGN UP
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default LoginForm
