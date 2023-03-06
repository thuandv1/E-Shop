import images from 'assets/images'
import BannerDefault from 'components/BannerDefault'
import classNames from 'classnames/bind'
import styles from './Cart.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faMinusCircle, faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect, useState } from 'react'
import * as fetchAPI from 'utils/api'
import { LoginContext } from 'Context/LoginContext'
import { CartContext } from 'Context/CartContext'

const cx = classNames.bind(styles)
function Cart() {
    const [cartItem, setCartItem] = useState([])
    const { userLogin } = useContext(LoginContext)
    const { productCart, setProductCart, handleQtyUp, handleQtyDown, handleDeleteProduct } = useContext(CartContext)

    useEffect(() => {
        console.log(productCart)

        Object.keys(productCart) &&
            fetchAPI
                .post('/product/cart', productCart)
                .then((res) => res.data && setCartItem(res.data))
                .catch((err) => console.log('err server', err))
    }, [productCart])

    return (
        <>
            <BannerDefault title={'#stayhome'} desc={'Save more coupons & up to 70% off!'} image={images.bannerCart} />
            <div className={cx('div-p1', 'cart')}>
                <table width="100%">
                    <thead>
                        <tr>
                            <td>Remove</td>
                            <td>Image</td>
                            <td>Product</td>
                            <td>Cost Price</td>
                            <td>Selling Price</td>
                            <td>Quantity</td>
                            <td>Subtotal</td>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItem.length > 0 &&
                            cartItem.map((product) => (
                                <tr key={product.id} className={cx('cart-product')}>
                                    <td>
                                        <i onClick={() => handleDeleteProduct(product.id)} className="fa-solid fa-circle-xmark"></i>
                                    </td>
                                    <td>
                                        <img
                                            src={`http://localhost:8080/laravel/public/upload/user/product/${product.id_user}/larger_${
                                                JSON.parse(product.image)[0]
                                            }`}
                                            alt=""
                                        />
                                    </td>
                                    <td>{product.name}</td>
                                    <td style={{ textDecoration: 'line-through' }}>
                                        {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ₫'}
                                    </td>
                                    <td>
                                        <span>
                                            {product.sale == null
                                                ? product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ₫'
                                                : ((product.price * (100 - product?.sale)) / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
                                                  ' ₫'}
                                        </span>
                                    </td>

                                    <td>
                                        <input
                                            value={product?.qty || 1}
                                            onChange={(ev) =>
                                                setProductCart((prev) => ({
                                                    ...prev,
                                                    [product.id]: +ev.target.value || 0
                                                }))
                                            }
                                            type="number"
                                            min="0"
                                        />
                                        <FontAwesomeIcon
                                            onClick={() => handleQtyUp(product.id, product.qty)}
                                            className={cx('quantity-up')}
                                            icon={faPlusCircle}
                                        />
                                        <FontAwesomeIcon
                                            onClick={() => handleQtyDown(product.id, product.qty)}
                                            className={cx('quantity-down')}
                                            icon={faMinusCircle}
                                        />
                                    </td>
                                    <td>
                                        <span>
                                            {product.sale == null
                                                ? (product.price * product.qty).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ₫'
                                                : (((product.price * (100 - product?.sale)) / 100) * product.qty)
                                                      .toString()
                                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ₫'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <div className={cx('div-p1', 'cart-total')}>
                <div className={cx('coupon')}>
                    <h3>Apply Coupon</h3>
                    <div>
                        <input type="text" placeholder="Enter Your Coupon" />
                        <button className={cx('normal')}>Apply</button>
                    </div>
                </div>
                <div className={cx('subtotal')}>
                    <h3>Cart Totals</h3>
                    <table>
                        <tbody>
                            <tr>
                                <td>Cart Subtotal</td>
                                <td>$ 335</td>
                            </tr>
                            <tr>
                                <td>Shipping</td>
                                <td>Free</td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>Total</strong>
                                </td>
                                <td>
                                    <strong>$ 335</strong>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button className={cx('normal')}>Proceed to checkout</button>
                </div>
            </div>
        </>
    )
}

export default Cart
