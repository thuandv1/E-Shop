import classNames from 'classnames/bind'
import styles from './Blog.module.scss'
import images from 'assets/images'
import BannerDefault from 'components/BannerDefault'
import BlogItem from 'pages/components/BlogItem'
import Pagination from 'components/Pagination'
import BannerSignUp from 'components/BannerSignUp'

const cx = classNames.bind(styles)

function Blog() {
    return (
        <>
            <BannerDefault title={'#readmore'} desc={'Read all case studies about our products!'} image={images.bannerBlog} />
            <div className={cx('blog')}>
                <BlogItem />
                <BlogItem />
                <BlogItem />
                <BlogItem />
                <BlogItem />
            </div>
            <Pagination />
            <BannerSignUp />
        </>
    )
}

export default Blog
