import { faClose, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal, Select } from 'antd'
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import images from 'assets/images'
import styles from './Register.module.scss'
import * as fetchApi from 'utils/api'

const cx = classNames.bind(styles)

function Register({ onRegisterClick }) {
    const [openModalReg, setOpenModalReg] = useState(true)
    const [dataUser, setDataUser] = useState({ level: 0, country: 3 })

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors }
    } = useForm({
        mode: 'onBlur',
        reValidateMode: 'onBlur'
    })

    const { onChange, onBlur, name, ref } = register()

    const onSubmitRegister = (dataReg) => {
        if (!dataUser.avatar) {
            setError('avatar', { message: 'Please choses avatar' })
        } else {
            fetchApi.post('register', { ...dataReg, ...dataUser }).then((res) => {
                console.log(res)
                console.log(dataReg)
                if (res?.errors?.email) {
                    setError('email', {
                        message: 'Email already exists'
                    })
                }
                if (res?.message === 'success') {
                    setOpenModalReg(false)
                    toast.success('Đăng ký tài khoản thành công!', {
                        position: 'top-center',
                        theme: 'dark'
                    })
                }
            })
        }
    }

    const handleChangeSelectCountry = (country) => {
        if (country) {
            setDataUser((prev) => ({ ...prev, country: Number(country) }))
        }
    }

    const handleFile = (ev) => {
        const file = ev.target.files

        if (file) {
            if (file[0].type.includes('image')) {
                if (file[0].size / 1024 / 1024 > 1) {
                    setError('avatar', {
                        message: 'Image must be less than 1mb'
                    })
                } else {
                    clearErrors('avatar', { require: true })
                    const fileConvert = file[0]

                    const reader = new FileReader()
                    reader.addEventListener('load', (ev) => {
                        setDataUser((prev) => ({ ...prev, avatar: ev.target.result }))
                    })

                    reader.readAsDataURL(fileConvert)
                }
            } else {
                setError('avatar', {
                    message: 'Please select file as image'
                })
            }
        }
    }

    useEffect(() => {
        onRegisterClick(openModalReg)
    }, [openModalReg])

    return (
        <>
            <Modal
                title=""
                centered
                closeIcon={<FontAwesomeIcon className={cx('close-icon')} icon={faClose} />}
                open={openModalReg}
                onCancel={() => setOpenModalReg(false)}
                width={'65vw'}
                footer={''}
            >
                <div style={{ backgroundImage: `url(${images.loginBgr})` }} className={cx('container')}>
                    <div className={cx('form')}>
                        <form key={2} action="" onSubmit={handleSubmit(onSubmitRegister)}>
                            <h1>Register</h1>
                            <div className={cx('form-action')}>
                                <label htmlFor="register-name">Full Name</label>
                                <div className={cx('div-border')}>
                                    <input
                                        onChange={onChange}
                                        name={name}
                                        ref={ref}
                                        {...register('name', {
                                            required: 'Please enter name'
                                        })}
                                        id="register-name"
                                        type="text"
                                        placeholder="Enter your name"
                                    />
                                    <span>
                                        <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                                    </span>
                                </div>
                                {errors.name && <small>{errors.name.message}</small>}
                            </div>
                            <div className={cx('form-action')}>
                                <label htmlFor="register-email">Email</label>
                                <div className={cx('div-border')}>
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
                                        id="register-email"
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
                                <label htmlFor="register-password">Password</label>
                                <div className={cx('div-border')}>
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
                                        id="register-password"
                                        type="password"
                                        placeholder="Enter your password"
                                    />
                                    <span>
                                        <FontAwesomeIcon className={cx('icon')} icon={faLock} />
                                    </span>
                                </div>
                                {errors.password && <small>{errors.password.message}</small>}
                            </div>
                            <div className={cx('form-action')}>
                                <label htmlFor="register-phone">Phone</label>
                                <div className={cx('div-border')}>
                                    <input
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        name={name}
                                        ref={ref}
                                        {...register('phone', {
                                            required: 'Please enter Phone',
                                            pattern: {
                                                value: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
                                                message: 'Invalid phone number'
                                            }
                                        })}
                                        id="register-phone"
                                        type="text"
                                        placeholder="Enter your phone"
                                    />
                                    <span>
                                        <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                                    </span>
                                </div>
                                {errors.phone && <small>{errors.phone.message}</small>}
                            </div>
                            <div className={cx('form-action')}>
                                <label htmlFor="register-address">Address</label>
                                <div className={cx('div-border')}>
                                    <input
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        name={name}
                                        ref={ref}
                                        {...register('address', {
                                            required: 'Please enter address'
                                        })}
                                        id="register-address"
                                        type="text"
                                        placeholder="Enter your address"
                                    />
                                    <span>
                                        <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                                    </span>
                                </div>
                                {errors.address && <small>{errors.address.message}</small>}
                            </div>
                            <div className={cx('form-action', 'form-action-avatar')}>
                                <label htmlFor="register-avatar">Avatar</label>
                                <div className={cx('div-border')}>
                                    <input onChange={handleFile} id="register-avatar" type="file" />
                                    <span>
                                        <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                                    </span>
                                </div>
                                {errors.avatar && <small>{errors.avatar.message}</small>}
                            </div>
                            <div className={cx('form-action', 'form-action-country')}>
                                <label htmlFor="register-country">Country</label>
                                <div className={cx('div-border')}>
                                    <Select
                                        defaultValue="Viet Nam"
                                        style={{ width: '88%', marginLeft: '12%' }}
                                        options={[
                                            {
                                                value: '3',
                                                label: 'Viet Nam'
                                            },
                                            {
                                                value: '4',
                                                label: 'Trung Quoc'
                                            },
                                            {
                                                value: '5',
                                                label: 'Han Quoc'
                                            }
                                        ]}
                                        id="register-country"
                                        onChange={handleChangeSelectCountry}
                                    />
                                    <span>
                                        <FontAwesomeIcon className={cx('icon', 'icon-country')} icon={faUser} />
                                    </span>
                                </div>
                            </div>
                            <button type="submit" className={cx('form-button')}>
                                REGISTER
                            </button>

                            <h4>Or Sign In Using</h4>

                            <a
                                className={cx('form__signup')}
                                onClick={() => {
                                    setOpenModalReg(false)
                                }}
                            >
                                SIGN IN
                            </a>
                        </form>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Register
