import images from 'assets/images'
import classNames from 'classnames/bind'
import styles from './BlogItem.module.scss'

const cx = classNames.bind(styles)

function BlogItem() {
    return (
        <div className={cx('blog-box')}>
            <div className={cx('blog-img')}>
                <img src={images.blog1} alt="" />
            </div>
            <div className={cx('blog-details')}>
                <h4>The Cotton-Jersey Zip-Up Hoodie</h4>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere obcaecati deleniti reiciendis iure harum illum quo dignissimos,
                    odit, placeat illo repellendus magnam magni, debitis ad similique quaerat veniam nesciunt accusantium!
                </p>
                <a>CONTINUE READING</a>
            </div>
            <h1>01/09</h1>
        </div>
    )
}

export default BlogItem
