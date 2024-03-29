import { faL, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getValue } from '@testing-library/user-event/dist/utils'
import { Select } from 'antd'
import images from 'assets/images'
import classNames from 'classnames/bind'
import { LoginContext } from 'Context/LoginContext'
import { useContext, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import api, * as fetchAPI from 'utils/api'
import styles from './CreateProduct.module.scss'

const cx = classNames.bind(styles)

function CreateProduct() {
    //Reacthook Form
    const {
        register,
        unregister,
        handleSubmit,
        setError,
        setValue,
        getValues,
        clearErrors,
        formState: { errors }
    } = useForm({ mode: 'onBlur', reValidateMode: 'onBlur', shouldUnregister: true })

    const { onChange, onBlur, name, ref } = register()
    //end

    const { userLogin } = useContext(LoginContext)
    console.log(userLogin)

    const [category, setCategory] = useState([])
    const [brand, setBrand] = useState([])
    const saleElRef = useRef()

    useEffect(() => {
        fetchAPI.get('category-brand').then((res) => {
            setCategory(res.category)
            setBrand(res.brand)
        })
    }, [])

    //handle get value select option input
    const handleChangeSelectBrand = (value) => {
        if (value) {
            setValue('brand', value)
            clearErrors('brand')
        }
    }

    const handleChangeSelectCategory = (value) => {
        if (value) {
            setValue('category', value)
            clearErrors('category')
        }
    }

    const handleChangeSelectStatus = (value) => {
        if (value) {
            //handle show sale input
            if (value === 2) {
                saleElRef.current.style.display = 'block'
            } else {
                saleElRef.current.style.display = 'none'
                clearErrors('sale')
            }

            setValue('status', value)
            clearErrors('status')
        }
    }

    const handleFile = (ev) => {
        const files = ev.target.files
        console.log(files)
        if (files) {
            if (files.length > 3) {
                setError('image', {
                    message: 'Please select max 3 files '
                })
            } else {
                if (!files[0].type.includes('image')) {
                    setError('image', {
                        message: 'Please select file as image'
                    })
                } else {
                    if (files[0].size / 1024 / 1024 > 1) {
                        setError('image', {
                            message: 'Image must be less than 1mb'
                        })
                    } else {
                        setValue('image', files)
                        clearErrors('image')
                    }
                }
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

    const onSubmitAddProduct = (data) => {
        !data.brand &&
            setError('brand', {
                message: 'Please select brand'
            })

        !data.category &&
            setError('category', {
                message: 'Please select category'
            })

        !data.status &&
            setError('status', {
                message: 'Please select status'
            })

        !data.image &&
            setError('image', {
                message: 'Please select image'
            })

        if (data && data.brand && data.category && data.status && data.image) {
            const formData = new FormData()

            Object.keys(data).map((key, el) => {
                if (key !== 'image') {
                    formData.append(key, data[key])
                } else {
                    const imageFiles = data[key]
                    imageFiles &&
                        Object.keys(imageFiles).map((key) => {
                            formData.append('file[]', imageFiles[key])
                        })
                }
            })

            fetchAPI.post('user/add-product', formData, config).then((res) => {
                console.log(res)
                if (res.response === 'success') {
                    toast.success('Successfully added new products', {
                        position: 'top-center',
                        theme: 'dark'
                    })
                } else {
                    console.log('err server')
                }
            })
        }
    }

    return (
        <div style={{ backgroundImage: `url(${images.bannerSignUp})` }} className={cx('container')}>
            <div className={cx('form')}>
                <form key={2} action="" onSubmit={handleSubmit(onSubmitAddProduct)}>
                    <h1>Create Your Product</h1>
                    <div className={cx('form-action')}>
                        <label htmlFor="addproduct-name">Name</label>
                        <div className={cx('div-border')}>
                            <input
                                onChange={onChange}
                                name={name}
                                ref={ref}
                                {...register('name', {
                                    required: 'Please enter name product'
                                })}
                                id="addproduct-name"
                                type="text"
                                placeholder="Enter  name product"
                            />
                            <span>
                                <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                            </span>
                        </div>
                        {errors.name && <small>{errors.name.message}</small>}
                    </div>
                    <div className={cx('form-action')}>
                        <label htmlFor="addproduct-price">Price</label>
                        <div className={cx('div-border')}>
                            <input
                                onChange={onChange}
                                name={name}
                                ref={ref}
                                {...register('price', {
                                    required: 'Please enter price product'
                                })}
                                id="addproduct-price"
                                type="text"
                                placeholder="Enter price product"
                            />
                            <span>
                                <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                            </span>
                        </div>
                        {errors.price && <small>{errors.price.message}</small>}
                    </div>
                    <div className={cx('form-action', 'form-action-category')}>
                        <div className={cx('div-border')}>
                            <Select
                                defaultValue={'Select Category'}
                                style={{ width: '100%' }}
                                options={category.map((item) => ({
                                    value: item.id,
                                    label: item.category
                                }))}
                                id="addproduct-country"
                                onChange={handleChangeSelectCategory}
                            />
                        </div>
                        {errors.category && <small>{errors.category.message}</small>}
                    </div>
                    <div className={cx('form-action', 'form-action-brand')}>
                        <div className={cx('div-border')}>
                            <Select
                                defaultValue={'Select Brand'}
                                style={{ width: '100%' }}
                                options={brand.map((item) => ({
                                    value: item.id,
                                    label: item.brand
                                }))}
                                id="addproduct-brand"
                                onChange={handleChangeSelectBrand}
                            />
                        </div>
                        {errors.brand && <small>{errors.brand.message}</small>}
                    </div>
                    <div className={cx('form-action', 'form-action-status')}>
                        <div className={cx('div-border')}>
                            <Select
                                defaultValue={'Select Status'}
                                style={{ width: '100%' }}
                                options={[
                                    {
                                        value: 1,
                                        label: 'New'
                                    },
                                    {
                                        value: 2,
                                        label: 'Sale'
                                    }
                                ]}
                                id="addproduct-brand"
                                onChange={handleChangeSelectStatus}
                            />
                        </div>
                        {errors.status && <small>{errors.status.message}</small>}
                    </div>
                    <div ref={saleElRef} className={cx('form-action', 'form-action-sale')}>
                        <label htmlFor="addproduct-sale">Sale ( % )</label>
                        <div className={cx('div-border')}>
                            <input
                                onChange={onChange}
                                name={name}
                                ref={ref}
                                {...register('sale', {
                                    pattern: {
                                        value: /^\d+$/,
                                        message: 'Please enter number'
                                    }
                                })}
                                id="addproduct-sale"
                                type="text"
                                placeholder="Enter price sale product"
                            />
                            <span>
                                <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                            </span>
                        </div>
                        {errors.sale && <small>{errors.sale.message}</small>}
                    </div>
                    <div className={cx('form-action')}>
                        <label htmlFor="addproduct-company">Company</label>
                        <div className={cx('div-border')}>
                            <input
                                onChange={onChange}
                                name={name}
                                ref={ref}
                                {...register('company', {
                                    required: 'Please enter company profile'
                                })}
                                id="addproduct-company"
                                type="text"
                                placeholder="Enter company"
                            />
                            <span>
                                <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                            </span>
                        </div>
                        {errors.company && <small>{errors.company.message}</small>}
                    </div>
                    <div className={cx('form-action', 'form-action-avatar')}>
                        <label htmlFor="addproduct-image">Image </label>
                        <div className={cx('div-border')}>
                            <input onChange={handleFile} id="addproduct-image" multiple type="file" />
                            <span>
                                <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                            </span>
                        </div>
                        {errors.image && <small>{errors.image.message}</small>}
                    </div>
                    <div className={cx('form-action')}>
                        <label htmlFor="addproduct-detail">Detail</label>
                        <div>
                            <textarea
                                onChange={onChange}
                                name={name}
                                ref={ref}
                                rows={3}
                                {...register('detail', {
                                    required: 'Please enter detail product'
                                })}
                                id="addproduct-detail"
                                type="text"
                                placeholder="Enter detail product"
                            />
                        </div>
                        {errors.detail && <small>{errors.detail.message}</small>}
                    </div>
                    <button type="submit" className={cx('form-button')}>
                        Create Product
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateProduct
