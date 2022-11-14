import images from 'assets/images'
import classNames from 'classnames/bind'
import styles from './AboutDesc.module.scss'

const cx = classNames.bind(styles)
function AboutDesc() {
    return (
        <div className={cx('div-p1', 'about-head')}>
            <img src={images.aboutDescImg} alt="" />
            <div className={cx('about-head__desc')}>
                <h2>Who We Are?</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod fugit quasi consequatur quo rem nemo culpa doloremque, molestiae
                    provident, mollitia vel, praesentium animi perferendis aperiam cumque error ipsa laboriosam fuga? Quos excepturi consequatur
                    animi. Quisquam, nostrum ab. Vel ipsam aperiam minus aliquam quos nulla temporibus, magnam hic ad non alias pariatur illo
                    perspiciatis officiis. Ea neque provident nam assumenda nobis.
                </p>
                <abbr title="">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat porro odit perspiciatis quae impedit ex quis! Ipsa error magnam
                    non inventore iusto, qui nemo quia veritatis iste, incidunt sed enim!
                </abbr>
                <br />
                <br />
                <marquee width="100%" bgcolor="#ccc" loop="-1" scrollamount="'5">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto nulla, exercitationem nihil libero at sequi quibusdam enim
                    cumque deserunt ab necessitatibus vitae! Tenetur quisquam asperiores similique error accusamus totam explicabo!
                </marquee>
            </div>
        </div>
    )
}

export default AboutDesc
