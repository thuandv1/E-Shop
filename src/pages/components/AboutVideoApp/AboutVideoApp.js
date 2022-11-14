import images from 'assets/images'
import classNames from 'classnames/bind'
import styles from './AboutVideoApp.module.scss'

const cx = classNames.bind(styles)
function AboutVideoApp() {
    return (
        <div className={cx('div-p1', 'about-app')}>
            <h1>
                Dowload Our <a>App</a>
            </h1>
            <div className={cx('about-app__video')}>
                <video autoPlay muted loop src={images.dowloadVideo}></video>
            </div>
        </div>
    )
}

export default AboutVideoApp
