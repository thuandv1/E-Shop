import { faCircleXmark, faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import { LoginContext } from 'Context/LoginContext'
import { useContext, useEffect, useState } from 'react'
import { Table, Toast } from 'reactstrap'
import api, * as fetchAPI from 'utils/api'
import styles from './MyProduct.module.scss'

import { confirmAlert } from 'react-confirm-alert' // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

function MyProduct() {
    const [products, setProducts] = useState({})

    const { userLogin } = useContext(LoginContext)

    let config = {
        headers: {
            Authorization: 'Bearer ' + userLogin.token,
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json'
        }
    }

    useEffect(() => {
        Object.keys(userLogin).length > 0 &&
            fetchAPI
                .get('user/my-product', config)
                .then((res) => setProducts(res.data))
                .catch((err) => console.log('err server: ', err))
    }, [userLogin])

    // const handleDeleteProduct = (idProduct) => {
    //     idProduct && fetchAPI.get(`user/delete-product/${idProduct}`, config).then((res) => console.log(res))
    // }

    const handleDeleteProduct = (idProduct) => {
        confirmAlert({
            // title: 'Do you want to delete this product?',
            message: 'Do you want to delete this product?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () =>
                        idProduct &&
                        fetchAPI.get(`user/delete-product/${idProduct}`, config).then((res) => {
                            if (res.response === 'success') {
                                toast.success('Delete product successfully', {
                                    position: 'top-center',
                                    theme: 'dark'
                                })
                                fetchAPI
                                    .get('user/my-product', config)
                                    .then((res) => setProducts(res.data))
                                    .catch((err) => console.log('err server: ', err))
                            }
                        })
                },
                {
                    label: 'No'
                    // onClick: () => alert('Click No')
                }
            ]
        })
    }

    return (
        <div className="div-p1">
            <Table responsive>
                <thead>
                    <tr className={cx('table-header')}>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {Object.keys(products).length > 0 ? (
                        Object.keys(products).map((el, index) => (
                            <tr key={products[el].id}>
                                <th scope="row">{products[el].id}</th>
                                <td>{products[el].name}</td>
                                <td>{products[el].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                                <td className={cx('product-action')}>
                                    <Link to={`edit-product/${products[el].id}`}>
                                        <FontAwesomeIcon className={cx('product-edit', 'product-icon')} icon={faGear} />
                                    </Link>

                                    <span>
                                        <FontAwesomeIcon
                                            className={cx('product-delete', 'product-icon')}
                                            icon={faCircleXmark}
                                            onClick={() => handleDeleteProduct(products[el].id)}
                                        />
                                    </span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <th>No Data</th>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default MyProduct
