import images from 'assets/images'
import classNames from 'classnames/bind'
import styles from './BannerOnlyHome.module.scss'

const cx = classNames.bind(styles)
function BannerOnlyHome() {
    return (
        <>
            <div className={cx('sm-banner', 'div-p1')}>
                <div className={cx('banner-box')} style={{ backgroundImage: `url(${images.bannerBox1})` }}>
                    <h4>crazy deals</h4>
                    <h2>buy 1 get 1 free</h2>
                    <span>The best classic dreess is on sale at cara</span>
                    <button className={cx('while')}>Learn More</button>
                </div>
                <div className={cx('banner-box')} style={{ backgroundImage: `url(${images.bannerBox2})` }}>
                    <h4>spring/summer</h4>
                    <h2>upcomming season</h2>
                    <span>The best classic dreess is on sale at cara</span>
                    <button className={cx('while')}>Collection</button>
                </div>
            </div>
            <div className={cx('ss-banner', 'div-p1')}>
                <div className={cx('banner-box')} style={{ backgroundImage: `url(${images.bannerBox3})` }}>
                    <h2>SEASONAL SALE</h2>
                    <h3>Winter Collection -50% OFF</h3>
                </div>
                <div className={cx('banner-box')} style={{ backgroundImage: `url(${images.bannerBox4})` }}>
                    <h2>SEASONAL SALE</h2>
                    <h3>Winter Collection -50% OFF</h3>
                </div>
                <div className={cx('banner-box')} style={{ backgroundImage: `url(${images.bannerBox5})` }}>
                    <h2>SEASONAL SALE</h2>
                    <h3>Winter Collection -50% OFF</h3>
                </div>
            </div>
        </>
    )
}

export default BannerOnlyHome
