import styles from './ContactFormDetail.module.scss'
import classNames from 'classnames/bind'
import images from 'assets/images'

const cx = classNames.bind(styles)
function ContactFormDetail() {
    return (
        <div className={cx('form-details')}>
            <form action="">
                <span>LEAVE A MESSAGE</span>
                <h2>We love to hear from you!</h2>
                <input type="text" placeholder="Enter Your Name" />
                <input type="text" placeholder="Enter E-mail Address" />
                <input type="text" placeholder="Enter Subject" />
                <textarea name="" id="" cols="30" rows="10" placeholder="Enter Your Message"></textarea>
                <button className={cx('normal')}>Submit</button>
            </form>
            <div className={cx('member')}>
                <div>
                    <img src={images.member1} alt="" />

                    <p>
                        <span>Jony Dang</span> Senior Marketing Manager <br /> Phone: +84 83 83 80 796
                        <br /> Email: thuandv.2001@gmail.com
                    </p>
                </div>
                <div>
                    <img src={images.member2} alt="" />
                    <p>
                        <span>Jony Dang</span> Senior Marketing Manager <br /> Phone: +84 83 83 80 796
                        <br /> Email: thuandv.2001@gmail.com
                    </p>
                </div>
                <div>
                    <img src={images.member3} alt="" />
                    <p>
                        <span>Jony Dang</span> Senior Marketing Manager <br /> Phone: +84 83 83 80 796
                        <br /> Email: thuandv.2001@gmail.com
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ContactFormDetail
