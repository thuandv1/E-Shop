import images from 'assets/images'
import styles from './Shop.module.scss'
import classNames from 'classnames/bind'
import ProductItem from 'components/ProductItem'
import BannerDefault from 'components/BannerDefault'
import Pagination from 'components/Pagination'
import BannerSignUp from 'components/BannerSignUp'
import BlogItem from 'pages/components/BlogItem'

const cx = classNames.bind(styles)

function Shop() {
    return (
        <>
            <BannerDefault title={'#stayhome'} desc={'Save more coupons & up to 70% off!'} image={images.bannerShop} />
            <div className={cx('product', 'div-p1')}>
                <div className={cx('product__container')}>
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                </div>
            </div>
            <Pagination />
            <BannerSignUp />
        </>
    )
}

export default Shop
