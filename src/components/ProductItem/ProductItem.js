import images from 'assets/images'
import classNames from 'classnames/bind'
import { CartContext } from 'Context/CartContext'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './ProductItem.module.scss'

const cx = classNames.bind(styles)
function Product({ dataProduct }) {
    const [imgProduct, setImgProduct] = useState([])
    const { handleAddCart } = useContext(CartContext)

    useEffect(() => {
        dataProduct.image && setImgProduct(JSON.parse(dataProduct.image))
    }, [dataProduct])

    //handle click product to preview product detail

    return (
        <div className={cx('product__item', 'col-2-5')}>
            <Link to={`/product/detail/${dataProduct.id}`}>
                <img
                    className={cx('product__item-img')}
                    src={`http://localhost:8080/laravel/public/upload/user/product/${dataProduct.id_user}/larger_${
                        imgProduct[Math.floor(Math.random() * imgProduct.length)]
                    }`}
                    alt=""
                />
            </Link>
            <div className={cx('product__item-desc')}>
                <span>{dataProduct.company_profile}</span>
                <h5>{dataProduct.name}</h5>
                <div className={cx('product__item-rate')}>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                </div>
                <h5 className={cx('product__item-price--old')}>
                    {dataProduct?.sale == null
                        ? dataProduct.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ₫'
                        : ((dataProduct.price * (100 - dataProduct?.sale)) / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </h5>
                <h4 className={cx('product__item-price')}>{dataProduct.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ₫'}</h4>
            </div>
            <span className={cx('product__item-link-cart')}>
                <i onClick={(ev) => handleAddCart(ev, dataProduct.id)} className="fa-solid fa-cart-shopping"></i>
            </span>
        </div>
    )
}

export default Product
