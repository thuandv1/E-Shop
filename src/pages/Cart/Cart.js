import images from 'assets/images'
import BannerDefault from 'components/BannerDefault'
import classNames from 'classnames/bind'
import styles from './Cart.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faMinusCircle, faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(styles)
function Cart() {
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
                        <tr className={cx('cart-product')}>
                            <td>
                                <i className="fa-solid fa-circle-xmark"></i>
                            </td>
                            <td>
                                <img src={images.product1} alt="" />
                            </td>
                            <td>Men's Fashion T Shirt</td>
                            <td style={{ textDecoration: 'line-through' }}>180.00</td>
                            <td>
                                $ <span>139.00</span>
                            </td>
                            <td>
                                <input defaultValue={1} type="number" min="0" />
                                <FontAwesomeIcon className={cx('quantity-up')} icon={faPlusCircle} />
                                <FontAwesomeIcon className={cx('quantity-down')} icon={faMinusCircle} />
                            </td>
                            <td>
                                $ <span>695.00</span>
                            </td>
                        </tr>
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
