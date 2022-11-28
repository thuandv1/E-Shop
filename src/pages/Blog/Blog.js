import classNames from 'classnames/bind'
import styles from './Blog.module.scss'
import images from 'assets/images'
import BannerDefault from 'components/BannerDefault'
import BlogItem from 'pages/components/BlogItem'
import Pagination from 'components/Pagination'
import BannerSignUp from 'components/BannerSignUp'
import { useEffect, useState } from 'react'
import * as fetchApi from 'utils/api'

const cx = classNames.bind(styles)

function Blog() {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        fetchApi
            .get('blog')
            .then((res) => setBlogs(res.blog.data))
            .catch((err) => console.log('fail: ', err))
    }, [])

    return (
        <>
            <BannerDefault title={'#readmore'} desc={'Read all case studies about our products!'} image={images.bannerBlog} />
            <div className={cx('blog')}>
                {blogs.map((blog) => (
                    <BlogItem key={blog.id} data={blog} />
                ))}
            </div>
            <Pagination />
            <BannerSignUp />
        </>
    )
}

export default Blog
