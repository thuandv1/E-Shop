import { useForm } from 'react-hook-form'

import styles from './MyAccount.module.scss'
import classNames from 'classnames/bind'
import images from 'assets/images'
import BannerDefault from 'components/BannerDefault'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect, useState } from 'react'
import { Select } from 'antd'
import { LoginContext } from 'Context/LoginContext'
import api from 'utils/api'
import { toast } from 'react-toastify'

const cx = classNames.bind(styles)

function MyAccount() {
    const { userLogin } = useContext(LoginContext)

    const [dataUser, setDataUser] = useState({})

    useEffect(() => {
        if (userLogin.info) {
            setDataUser(userLogin.info)
            setValue('email', userLogin.info.email)
            setValue('name', userLogin.info.name)
            setValue('phone', userLogin.info.phone)
            setValue('address', userLogin.info.address)
            setValue('avatar', userLogin.info.avatar)
            setValue('country', userLogin.info.country)
        }
    }, [userLogin])

    useEffect(() => {
        console.log(dataUser)
    }, [dataUser])

    const {
        register,
        handleSubmit,
        setError,
        setValue,
        clearErrors,
        formState: { errors }
    } = useForm({
        mode: 'onBlur',
        reValidateMode: 'onBlur'
    })

    const { onChange, onBlur, name, ref } = register()

    const handleChangeSelectCountry = (country) => {
        if (country) {
            setValue('country', Number(country))
            // setDataUser((prev) => ({ ...prev, country: Number(country) }))
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
                        setValue('avatar', ev.target.result)
                        // setDataUser((prev) => ({ ...prev, avatar: ev.target.result }))
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

    let config = {
        headers: {
            Authorization: 'Bearer ' + userLogin.token,
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json'
        }
    }

    const onSubmitUpdate = (data) => {
        console.log(dataUser.id)
        api.post(`user/update/${dataUser.id}`, data, config).then((res) => {
            console.log(res)
            res.data.response === 'success' &&
                toast.success('Cập nhập tài khoản thành công', {
                    position: 'top-center',
                    theme: 'dark'
                })
        })
    }

    return (
        <>
            {/* <BannerDefault title={'#stayhome'} desc={'Save more coupons & up to 70% off!'} images={images.bannerCart} /> */}
            <div style={{ backgroundImage: `url(${images.bannerSignUp})` }} className={cx('container')}>
                <div className={cx('form')}>
                    <form key={2} action="" onSubmit={handleSubmit(onSubmitUpdate)}>
                        <h1>Update Your Account</h1>
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
                                    disabled
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    name={name}
                                    ref={ref}
                                    {...register('email')}
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
                                    name={name}
                                    ref={ref}
                                    {...register('password', {
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
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default MyAccount
