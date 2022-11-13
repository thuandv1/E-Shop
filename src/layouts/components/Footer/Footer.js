import images from 'assets/images'
import classNames from 'classnames/bind'
import styles from './Footer.module.scss'

const cx = classNames.bind(styles)

function Footer() {
    return (
        <footer className={cx('footer', 'div-p1')}>
            <div className={cx('col')}>
                <img className={cx('logo')} src={images.logo} alt="" />
                <h4>Contact</h4>
                <p>
                    <strong>Address: </strong> 27/47 Trần Xuân Lê, Thanh Khê, Đà Nẵng
                </p>
                <p>
                    <a href="tel: 84838380796">
                        <strong>Phone: </strong>
                    </a>{' '}
                    +84838380796
                </p>
                <p>
                    <strong>Hours: </strong> 10:00 - 18:00 Mon - Sat
                </p>
                <div className={cx('footer__follow')}>
                    <h4>Follow us</h4>
                    <div className={cx('footer__follow-socials')}>
                        <i className="fa-brands fa-facebook-f"></i>
                        <i className="fa-brands fa-twitter"></i>
                        <i className="fa-brands fa-instagram"></i>
                        <i className="fa-brands fa-linkedin"></i>
                        <i className="fa-brands fa-youtube"></i>
                        <i className="fa-brands fa-telegram"></i>
                    </div>
                </div>
            </div>
            <div className={cx('col')}>
                <h4>About</h4>
                <a>About us</a>
                <a>Delivery Infomation</a>
                <a>Privacy Policy</a>
                <a>Terms & Conditions</a>
                <a>Contact us</a>
            </div>
            <div className={cx('col')}>
                <h4>My Account</h4>
                <a>Sign In</a>
                <a>View Cart</a>
                <a>My Wishlist</a>
                <a>Track My Order</a>
                <a>Help</a>
            </div>
            <div className={cx('footer__follow', 'row', 'footer__follow-mobile')}>
                <h4>Follow us</h4>
                <div className={cx('footer__follow-socials')}>
                    <i className="fa-brands fa-facebook-f"></i>
                    <i className="fa-brands fa-twitter"></i>
                    <i className="fa-brands fa-instagram"></i>
                    <i className="fa-brands fa-linkedin"></i>
                    <i className="fa-brands fa-youtube"></i>
                    <i className="fa-brands fa-telegram"></i>
                </div>
            </div>
            <div className={cx('col', 'install')}>
                <h4>Install App</h4>
                <p>From App Store or Google Play</p>
                <div className={cx('row')}>
                    <img src={images.appStoreImg} alt="" />
                    <img src={images.playStoreImg} alt="" />
                </div>
                <p>Secured Payment Gateways</p>
                <img src={images.payImg} alt="" />
            </div>
            <div className={cx('copyright')}>
                <p>© 2022, Van Thuan</p>
            </div>
        </footer>
    )
}

export default Footer
