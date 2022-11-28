import images from 'assets/images'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import styles from './BlogItem.module.scss'

const cx = classNames.bind(styles)

function BlogItem({ data }) {
    return (
        <div className={cx('blog-box')}>
            <div className={cx('blog-img')}>
                <img src={`http://localhost:8080/laravel/public/upload/Blog/image/${data.image}`} alt="" />
            </div>
            <div className={cx('blog-details')}>
                <h4>{data.title}</h4>
                <p>{data.description}</p>
                <Link to={`/blog/detail/${data.id}`}>CONTINUE READING</Link>
            </div>
            <h1>01/09</h1>
        </div>
    )
}

export default BlogItem
