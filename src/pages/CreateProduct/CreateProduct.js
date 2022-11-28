import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Select } from 'antd'
import images from 'assets/images'
import classNames from 'classnames/bind'
import { LoginContext } from 'Context/LoginContext'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import api, * as fetchAPI from 'utils/api'
import styles from './CreateProduct.module.scss'

const cx = classNames.bind(styles)

function CreateProduct() {
    //Reacthook Form
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        clearErrors,
        formState: { errors }
    } = useForm({ mode: 'onBlur', reValidateMode: 'onBlur' })

    const { onChange, onBlur, name, ref } = register()
    //

    const { userLogin } = useContext(LoginContext)

    const [category, setCategory] = useState([])
    const [brand, setBrand] = useState([])

    useEffect(() => {
        fetchAPI.get('category-brand').then((res) => {
            setCategory(res.category)
            setBrand(res.brand)
        })
    }, [])

    useEffect(() => {
        console.log('category: ', category, 'brand: ', brand)
    }, [category])

    const handleChangeSelectCountry = (country) => {
        if (country) {
            setValue('country', Number(country))
            // setDataUser((prev) => ({ ...prev, country: Number(country) }))
        }
    }

    let config = {
        headers: {
            Authorization: 'Bearer ' + userLogin.token,
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json'
        }
    }

    const onSubmitAddProduct = (data) => {
        console.log(data)
    }

    return (
        <div style={{ backgroundImage: `url(${images.bannerSignUp})` }} className={cx('container')}>
            <div className={cx('form')}>
                <form key={2} action="" onSubmit={handleSubmit(onSubmitAddProduct)}>
                    <h1>Create Your Product</h1>
                    <div className={cx('form-action', 'form-action-brand')}>
                        <div className={cx('div-border')}>
                            <Select
                                defaultValue={'Select Category'}
                                style={{ width: '88%', marginLeft: '12%' }}
                                options={category.map((item) => ({
                                    value: [item.id],
                                    label: [item.category]
                                }))}
                                id="addproduct-country"
                                onChange={handleChangeSelectCountry}
                            />
                            <span>
                                <FontAwesomeIcon className={cx('icon', 'icon-country')} icon={faUser} />
                            </span>
                        </div>
                    </div>

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
                            <input id="register-avatar" type="file" />
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
    )
}

export default CreateProduct
