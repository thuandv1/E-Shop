import classNames from 'classnames/bind'
import styles from './Pagination.module.scss'

const cx = classNames.bind(styles)
function Pagination({ page = 2 }) {
    return (
        <div className={cx('pagination', 'div-p1')}>
            <a className={cx('active')}>1</a>
            <a>2</a>
            <a>
                <i className="fa-solid fa-angle-right"></i>
            </a>
        </div>
    )
}

export default Pagination
