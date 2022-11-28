import images from 'assets/images'
import classNames from 'classnames/bind'
import styles from './ContactFormDetails.module.scss'

const cx = classNames.bind(styles)
function ContactFormDetails() {
    return (
        <div id="form-details">
            <form action>
                <span>LEAVE A MESSAGE</span>
                <h2>We love to hear from you!</h2>
                <input type="text" placeholder="Enter Your Name" />
                <input type="text" placeholder="Enter E-mail Address" />
                <input type="text" placeholder="Enter Subject" />
                <textarea name id cols={30} rows={10} placeholder="Enter Your Message" defaultValue={''} />
                <button className="normal">Submit</button>
            </form>
            <div className="menber">
                <div>
                    <img src="./img/people/1.png" alt="" />
                    <p>
                        <span>Jony Dang</span> Senior Marketing Manager <br /> Phone: +84 83 83 80 796
                        <br /> Email: thuandv.2001@gmail.com
                    </p>
                </div>
                <div>
                    <img src="./img/people/2.png" alt="" />
                    <p>
                        <span>Jony Dang</span> Senior Marketing Manager <br /> Phone: +84 83 83 80 796
                        <br /> Email: thuandv.2001@gmail.com
                    </p>
                </div>
                <div>
                    <img src="./img/people/3.png" alt="" />
                    <p>
                        <span>Jony Dang</span> Senior Marketing Manager <br /> Phone: +84 83 83 80 796
                        <br /> Email: thuandv.2001@gmail.com
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ContactFormDetails
