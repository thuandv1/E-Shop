import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'antd/dist/antd.css'
import { Select } from 'antd'
import images from 'assets/images'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import styles from './Register.module.scss'
import { useState } from 'react'

const cx = classNames.bind(styles)

function Register() {
    const handleChange = (value) => {
        console.log(`selected ${value}`)
    }
    return (
        <div style={{ backgroundImage: `url(${images.loginBgr})` }} className={cx('container')}>
            <div className={cx('form')}>
                <form action="">
                    <h1>Login</h1>
                    <div className={cx('form-action')}>
                        <label htmlFor="login-name">Full Name</label>
                        <div>
                            <input id="login-name" type="text" placeholder="Enter your name" />
                            <span>
                                <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                            </span>
                        </div>
                    </div>
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
                    <div className={cx('form-action')}>
                        <label htmlFor="login-phone">Phone</label>
                        <div>
                            <input id="login-phone" type="text" placeholder="Enter your phone" />
                            <span>
                                <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                            </span>
                        </div>
                    </div>

                    <div className={cx('form-action')}>
                        <label htmlFor="login-address">Address</label>
                        <div>
                            <input id="login-address" type="text" placeholder="Enter your address" />
                            <span>
                                <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                            </span>
                        </div>
                    </div>
                    <div className={cx('form-action')}>
                        <label htmlFor="login-avatar">Avatar</label>
                        <div>
                            <input id="login-avatar" type="file" />
                            <span>
                                <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                            </span>
                        </div>
                    </div>

                    <div className={cx('form-action')}>
                        <label className={cx('country')} htmlFor="login-country">
                            Country
                        </label>
                        <Select
                            defaultValue="lucy"
                            style={{
                                width: '100%'
                            }}
                            onChange={handleChange}
                            options={[
                                {
                                    value: 'jack',
                                    label: 'Jack'
                                },
                                {
                                    value: 'lucy',
                                    label: 'Lucy'
                                }
                            ]}
                        />
                    </div>

                    <button type="submit" className={cx('form-button')}>
                        LOGIN
                    </button>

                    <h4>Or Sign Up Using</h4>
                    <Link to={'/login'} className={cx('form__signup')}>
                        SIGN UP
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Register
