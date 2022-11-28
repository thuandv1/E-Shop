import classNames from 'classnames/bind'
import styles from './ContactMap.module.scss'

const cx = classNames.bind(styles)
function ContactMap() {
    return (
        <>
            <div className={cx('div-p1', 'contact-details')}>
                <div className={cx('details')}>
                    <span>GET IN TOUCH</span>
                    <h2>Visit one of our agency locations or contact us today</h2>
                    <h3>Head Office</h3>
                    <ul>
                        <li>
                            <i className="fa-solid fa-map"></i>
                            <p>289/159 Tran Xuan Le, Thanh Khe, Da Nang</p>
                        </li>
                        <li>
                            <i className="fa-solid fa-envelope"></i>
                            <p>thuandv.2001@gmail.com</p>
                        </li>
                        <li>
                            <i className="fa-solid fa-phone"></i>
                            <p>+84 83 83 80 796</p>
                        </li>
                        <li>
                            <i className="fa-solid fa-clock"></i>
                            <p>Monday to Sunday: 9:00am to 16:00pm</p>
                        </li>
                    </ul>
                </div>
                <div className={cx('map')}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.1529768685664!2d108.17826441526975!3d16.057549544015096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219056c3f8ef5%3A0xf63e6fd1de8ad2fc!2zMjg5LCAxNTkgVHLGsOG7nW5nIENoaW5oLCBIb8OgIEFuLCBD4bqpbSBM4buHLCDEkMOgIE7hurVuZyA1NTAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1668444136199!5m2!1svi!2s"
                        width="600"
                        height="450"
                        style={{ border: '0' }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </>
    )
}

export default ContactMap
