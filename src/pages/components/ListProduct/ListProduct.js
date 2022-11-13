import classNames from 'classnames/bind'
import ProductItem from 'components/ProductItem'
import styles from './ListProduct.module.scss'

const cx = classNames.bind(styles)

function ListProduct({ title, desc }) {
    return (
        <div className={cx('product', 'div-p1')}>
            <h2 className={cx('product__title')}>{title}</h2>
            <p>{desc}</p>
            <div className={cx('product__container')}>
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
    )
}

export default ListProduct
