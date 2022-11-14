import images from 'assets/images'
import classNames from 'classnames/bind'
import styles from './BannerDefault.module.scss'

const cx = classNames.bind(styles)
function Banner({ title, desc, image = images.bannerBlog }) {
    return (
        <div className={cx('about-header', 'page-header')} style={{ backgroundImage: `url(${image})` }}>
            <h2>{title}</h2>
            <p>{desc}</p>
        </div>
    )
}

export default Banner
