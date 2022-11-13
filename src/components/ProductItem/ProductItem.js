import images from 'assets/images'
import classNames from 'classnames/bind'
import styles from './ProductItem.module.scss'

const cx = classNames.bind(styles)
function Product() {
    return (
        <div className={cx('product__item', 'col-2-5')}>
            <img className={cx('product__item-img')} src={images.product1} alt="" />
            <div className={cx('product__item-desc')}>
                <span>adidas</span>
                <h5>Cartoon Astronaut T-Shirts</h5>
                <div className={cx('product__item-rate')}>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                </div>
                <h4 className={cx('product__item-price')}>$78</h4>
            </div>
            <a className={cx('product__item-link-cart')}>
                <i className="fa-solid fa-cart-shopping"></i>
            </a>
        </div>
    )
}

export default Product
