import styles from './BannerHero.module.scss'
import classNames from 'classnames/bind'
import images from 'assets/images'

const cx = classNames.bind(styles)

function BannerHero() {
    return (
        <div
            style={{
                backgroundImage: `url(${images.bannerHero})`
            }}
            className={cx('hero')}
        >
            <h4>Trade-in-offer</h4>
            <h2>Super value deal</h2>
            <h1>On all products</h1>
            <p>Save more coupons & up to 70% off!</p>
            <button style={{ backgroundImage: `url(${images.buttonImg})` }}>Shop Now</button>
        </div>
    )
}

export default BannerHero
