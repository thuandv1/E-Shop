import classNames from 'classnames/bind'
import styles from './Feature.module.scss'

const cx = classNames.bind(styles)

const hehe = [1, 2, 3, 4, 5, 6]

function FeatureItem({ image, title }) {
    return (
        <div className={cx('feature__box')}>
            <img src={image} alt="" />
            <h6>{title}</h6>
        </div>
    )
}

export default FeatureItem
