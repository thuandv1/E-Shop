import classNames from 'classnames/bind'
import ProductItem from 'components/ProductItem'
import { useState } from 'react'
import { useEffect } from 'react'
import api, * as fetchAPI from 'utils/api'
import styles from './ListProduct.module.scss'

const cx = classNames.bind(styles)

function ListProduct({ title = '', desc = '', qtyItem = 9999 }) {
    const [products, setProducts] = useState([])

    //get product
    useEffect(() => {
        fetchAPI
            .get('product')
            .then((res) => {
                res.response === 'success' && setProducts(res.data)
            })
            .catch((err) => console.log('err server', err))
    }, [])

    return (
        <div className={cx('product', 'div-p1')}>
            <h2 className={cx('product__title')}>{title}</h2>
            <p>{desc}</p>
            <div className={cx('product__container')}>
                {products.map((product, index) => index < qtyItem && <ProductItem key={product.id} dataProduct={product} />)}
            </div>
        </div>
    )
}

export default ListProduct
