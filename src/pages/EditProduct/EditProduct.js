import { faL, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getValue } from '@testing-library/user-event/dist/utils'
import { Select } from 'antd'
import images from 'assets/images'
import classNames from 'classnames/bind'
import { LoginContext } from 'Context/LoginContext'
import { useContext, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import api, * as fetchAPI from 'utils/api'
import styles from './EditProduct.module.scss'

const cx = classNames.bind(styles)

function EditProduct() {
    //get id product
    const params = useParams()
    const imgInputRef = useRef()

    const { userLogin } = useContext(LoginContext)

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

    let config = {
        headers: {
            Authorization: 'Bearer ' + userLogin.token,
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json'
        }
    }

    const [product, setProduct] = useState({})
    const [imgProduct, setImgProduct] = useState([])
    const [category, setCategory] = useState([])
    const [brand, setBrand] = useState([])
    const [imgCheckBox, setImgCheckBox] = useState([])
    const [selectLabel, setSelectLabel] = useState({
        categoryLabel: 'Select Category',
        brandLabel: 'Select Brand',
        statusLabel: 'Select Status'
    })
    const saleElRef = useRef()

    useEffect(() => {
        fetchAPI.get('category-brand').then((res) => {
            setCategory(res.category)
            setBrand(res.brand)
        })
    }, [])

    //get profile product
    useEffect(() => {
        Object.keys(userLogin).length > 0 &&
            fetchAPI.get(`user/product/${params.id}`, config).then((res) => {
                console.log(res)
                if (res.response === 'success') {
                    setProduct(res.data)
                    setImgProduct(res.data.image)
                    setValue('name', res.data.name)
                    setValue('price', res.data.price)
                    setValue('brand', res.data.id_brand)
                    setValue('category', res.data.id_category)
                    setValue('company', res.data.company_profile)
                    setValue('status', res.data.status)
                    setValue('sale', res.data.sale)
                    setValue('detail', res.data.detail)

                    if (getValues('status') == 2) {
                        saleElRef.current.style.display = 'block'
                    }
                }
            })
    }, [userLogin])

    // useEffect(() => {
    //     category.map((item) => {
    //         if (item.id == product.id_category) {
    //             setSelectLabel((prev) => ({ ...prev, categoryLabel: item.category }))
    //         }
    //     })

    //     brand.map((item) => {
    //         if (item.id == product.id_brand) {
    //             setSelectLabel((prev) => ({ ...prev, brandLabel: item.brand }))
    //         }
    //     })

    //     product?.status === 1
    //         ? setSelectLabel((prev) => ({ ...prev, statusLabel: 'New' }))
    //         : setSelectLabel((prev) => ({ ...prev, statusLabel: 'Sale' }))
    // }, [product])

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
                        handleCheckLengthImgSubmit()
                    }
                }
            }
        }
    }

    const handleCheckImg = (ev) => {
        const checked = ev.target.checked
        const value = ev.target.value

        if (checked) {
            setImgCheckBox((prev) => [...prev, value])
        } else {
            setImgCheckBox((prev) => prev.filter((item) => item !== value))
        }
        clearErrors('image')
    }

    const handleCheckLengthImgSubmit = () => {
        let flag = false
        const lengthImgData = imgProduct.length || 0
        const lengthImgUpload = getValues('image')?.length || 0
        const lengthImgDelete = imgCheckBox.length || 0

        const lengthTotalImg = +lengthImgData + +lengthImgUpload - +lengthImgDelete

        if (lengthTotalImg <= 5) {
            clearErrors('image')
            flag = true
        } else {
            setError('image', {
                message: 'Maxium 5 files, Please choose files to delete'
            })
            flag = false
        }

        return flag
    }

    const onSubmitAddProduct = (data) => {
        console.log(data)
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

        if (data && data.brand && data.category && data.status && data.image && handleCheckLengthImgSubmit()) {
            const formData = new FormData()
            imgCheckBox.map((item) => formData.append('avatarCheckBox[]', item))

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

            fetchAPI.post(`user/edit-product/${params.id}`, formData, config).then((res) => {
                console.log(res)
                if (res.response === 'success') {
                    toast.success('Successfully update products', {
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
                    <h1>Edit Your Product</h1>
                    <div className={cx('form-action')}>
                        <label htmlFor="editproduct-name">Name</label>
                        <div className={cx('div-border')}>
                            <input
                                onChange={onChange}
                                name={name}
                                ref={ref}
                                {...register('name', {
                                    required: 'Please enter name product'
                                })}
                                id="editproduct-name"
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
                        <label htmlFor="editproduct-price">Price</label>
                        <div className={cx('div-border')}>
                            <input
                                onChange={onChange}
                                name={name}
                                ref={ref}
                                {...register('price', {
                                    required: 'Please enter price product'
                                })}
                                id="editproduct-price"
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
                                defaultValue={selectLabel.categoryLabel}
                                style={{ width: '100%' }}
                                options={category.map((item) => ({
                                    value: item.id,
                                    label: item.category
                                }))}
                                id="editproduct-category"
                                onChange={handleChangeSelectCategory}
                            />
                        </div>
                        {errors.category && <small>{errors.category.message}</small>}
                    </div>
                    <div className={cx('form-action', 'form-action-brand')}>
                        <div className={cx('div-border')}>
                            <Select
                                defaultValue={selectLabel.brandLabel}
                                style={{ width: '100%' }}
                                options={brand.map((item) => ({
                                    value: item.id,
                                    label: item.brand
                                }))}
                                id="editproduct-brand"
                                onChange={handleChangeSelectBrand}
                            />
                        </div>
                        {errors.brand && <small>{errors.brand.message}</small>}
                    </div>
                    <div className={cx('form-action', 'form-action-status')}>
                        <div className={cx('div-border')}>
                            <Select
                                defaultValue={selectLabel.statusLabel}
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
                                id="editproduct-brand"
                                onChange={handleChangeSelectStatus}
                            />
                        </div>
                        {errors.status && <small>{errors.status.message}</small>}
                    </div>
                    <div ref={saleElRef} className={cx('form-action', 'form-action-sale')}>
                        <label htmlFor="editproduct-sale">Sale ( % )</label>
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
                                id="editproduct-sale"
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
                        <label htmlFor="editproduct-company">Company</label>
                        <div className={cx('div-border')}>
                            <input
                                onChange={onChange}
                                name={name}
                                ref={ref}
                                {...register('company', {
                                    required: 'Please enter company profile'
                                })}
                                id="editproduct-company"
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
                        <label htmlFor="editproduct-image">Image </label>
                        <div className={cx('div-border')}>
                            <input onChange={handleFile} id="editproduct-image" multiple type="file" />
                            <span>
                                <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                            </span>
                        </div>
                        {errors.image && <small>{errors.image.message}</small>}
                        <div className={cx('image-product')}>
                            {imgProduct.length > 0 &&
                                imgProduct.map((img, index) => (
                                    <div key={index}>
                                        <img src={`http://localhost:8080/laravel/public/upload/user/product/${product.id_user}/${img}`} alt="" />
                                        <input ref={imgInputRef} value={img} onChange={handleCheckImg} type="checkbox" />
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className={cx('form-action')}>
                        <label htmlFor="editproduct-detail">Detail</label>
                        <div>
                            <textarea
                                onChange={onChange}
                                name={name}
                                ref={ref}
                                rows={3}
                                {...register('detail', {
                                    required: 'Please enter detail product'
                                })}
                                id="editproduct-detail"
                                type="text"
                                placeholder="Enter detail product"
                            />
                        </div>
                        {errors.detail && <small>{errors.detail.message}</small>}
                    </div>
                    <button type="submit" className={cx('form-button')}>
                        Update Product
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditProduct
