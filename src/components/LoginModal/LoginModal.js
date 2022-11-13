import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import classNames from 'classnames/bind'
import { Modal } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightToBracket, faBarcode, faBookBookmark, faBookmark, faClose, faLock, faPen, faUser } from '@fortawesome/free-solid-svg-icons'
import Tippy from '@tippyjs/react/headless'

import images from 'assets/images'
import styles from './LoginModal.module.scss'
import RegisterModal from 'components/RegisterModal'
import * as fetchApi from 'utils/api'
import { LoginContext } from 'Context/LoginContext'
import { toast, ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

function LoginModal() {
    const [openLogin, setOpenLogin] = useState(false)
    const { postLogin, userLogin, handleLogout } = useContext(LoginContext)

    console.log(userLogin)

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm({
        mode: 'onBlur',
        reValidateMode: 'onBlur'
    })

    const { onChange, onBlur, name, ref } = register()

    const onSubmit = async (data) => {
        if (data) {
            const resData = await postLogin(data)
            if (resData.response === 'success') {
                toast.success('Đăng nhập thành công!', {
                    position: 'top-center',
                    theme: 'dark'
                })
                setOpenLogin(false)
            } else {
                setError('email', { message: 'Invalid email or password' })
            }
        }
    }

    return (
        <>
            <ToastContainer progressClassName="toastProgress" bodyClassName="toastBody" />
            {userLogin.token ? (
                <Tippy
                    placement="top"
                    interactive
                    render={(attrs) => (
                        <div className={cx('account-menu')} tabIndex={'-1'} {...attrs}>
                            <Link className={cx('account-item')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faPen} />
                                <span>My product</span>
                            </Link>
                            <Link className={cx('account-item')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faBookmark} />
                                <span>My Product</span>
                            </Link>
                            <a onClick={handleLogout} className={cx('account-item')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faArrowRightToBracket} />
                                <span>Sign Out</span>
                            </a>
                        </div>
                    )}
                >
                    <a className={cx('login')}>
                        <FontAwesomeIcon icon={faUser} style={{ marginRight: '10px' }} />
                        {`Hi, ${userLogin.info.name}`}
                    </a>
                </Tippy>
            ) : (
                <a className={cx('login')} onClick={() => setOpenLogin(true)}>
                    <FontAwesomeIcon icon={faUser} style={{ marginRight: '10px' }} />
                </a>
            )}

            {userLogin.token ? (
                <></>
            ) : (
                <Modal
                    title=""
                    centered
                    closeIcon={<FontAwesomeIcon className={cx('close-icon')} icon={faClose} />}
                    open={openLogin}
                    onOk={() => {
                        console.log('hehe')
                    }}
                    onCancel={() => setOpenLogin(false)}
                    width={'65%'}
                    footer={''}
                >
                    <div style={{ backgroundImage: `url(${images.loginBgr})` }} className={cx('container')}>
                        <div className={cx('form')}>
                            <form action="" onSubmit={handleSubmit(onSubmit)}>
                                <h1>Login</h1>
                                <div className={cx('form-action')}>
                                    <label htmlFor="login-email">Email</label>
                                    <div>
                                        <input
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            name={name}
                                            ref={ref}
                                            {...register('email', {
                                                required: 'Please enter email',
                                                pattern: {
                                                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                                    message: 'Invalid email address'
                                                }
                                            })}
                                            id="login-email"
                                            type="text"
                                            placeholder="Enter your email"
                                        />
                                        <span>
                                            <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                                        </span>
                                    </div>
                                    {errors.email && <small>{errors.email.message}</small>}
                                </div>
                                <div className={cx('form-action')}>
                                    <label htmlFor="login-password">Password</label>
                                    <div>
                                        <input
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            name={name}
                                            ref={ref}
                                            {...register('password', {
                                                required: 'Please enter Password',
                                                pattern: {
                                                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                                    message: 'Minimum eight characters, one letter and one number'
                                                }
                                            })}
                                            id="login-password"
                                            type="password"
                                            placeholder="Enter your password"
                                        />
                                        <span>
                                            <FontAwesomeIcon className={cx('icon')} icon={faLock} />
                                        </span>
                                    </div>
                                    {errors.password && <small>{errors.password.message}</small>}
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

                                <RegisterModal />
                            </form>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )
}

export default LoginModal
