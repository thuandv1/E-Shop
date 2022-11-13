import images from 'assets/images'
import classNames from 'classnames/bind'
import styles from './BannerOnly.module.scss'

const cx = classNames.bind(styles)

function BannerOnly() {
    return (
        <div className={cx('banner', 'div-m1')} style={{ backgroundImage: `url(${images.bannerOnly})` }}>
            <h4>Repair Service</h4>
            <h2>
                Up to <span>70% Off</span> - All T-Shirt & Accessories
            </h2>
            <button className={'normal'}>Explore More</button>
        </div>
    )
}

export default BannerOnly
