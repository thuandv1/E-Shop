import images from 'assets/images'
import classNames from 'classnames/bind'
import styles from './BannerSignUp.module.scss'

const cx = classNames.bind(styles)
function BannerSignUp() {
    return (
        <div className={cx('div-p1', 'div-m1', 'newsletter')} style={{ backgroundImage: `url(${images.bannerSignUp})` }}>
            <div className={cx('newsletter__text')}>
                <h4>Sign Up For Newletters</h4>
                <p>
                    Get E-mail updates about our latest shop and <span>special offers.</span>
                </p>
            </div>
            <div className={cx('form')}>
                <input type="email" placeholder="Enter your email address" />
                <button className={cx('normal')}>Sign Up</button>
            </div>
        </div>
    )
}

export default BannerSignUp
