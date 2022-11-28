import { useLocation, useParams } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './BlogDetail.module.scss'
import images from 'assets/images'
import Comment from 'components/Comment'
import { useEffect, useState } from 'react'
import * as fetchAPI from 'utils/api'
import Rate from 'components/Rate'

const cx = classNames.bind(styles)

function BlogDetail() {
    const params = useParams()

    const [blogDetail, setBlogDetail] = useState({})
    const [listComment, setListComment] = useState([])

    useEffect(() => {
        fetchAPI
            .get(`blog/detail/${params.id}`)
            .then((res) => {
                setBlogDetail(res.data)
                setListComment(res.data.comment)
            })
            .catch((err) => console.log('fail: ', err))
    }, [])

    const handleShowCommentOnPost = () => {
        fetchAPI
            .get(`blog/detail/${params.id}`)
            .then((res) => setListComment(res.data.comment))
            .catch((err) => console.log('fail: ', err))
    }

    return (
        <div className={cx('blog__detail', 'div-p1')}>
            <h1 className={cx('title')}>{blogDetail.title}</h1>
            <div className={cx('post-meta')}>
                <ul>
                    <li>
                        <i className="fa fa-user"></i> Mac Doe
                    </li>
                    <li>
                        <i className="fa-solid fa-clock"></i>
                        {blogDetail.updated_at && blogDetail.updated_at.split(' ', 2)[1]}
                    </li>
                    <li>
                        <i className="fa fa-calendar"></i> {blogDetail.updated_at && blogDetail?.updated_at.split(' ', 2)[0]}
                    </li>
                </ul>
                <Rate idBlog={params.id} />
            </div>
            <img src={`http://localhost:8080/laravel/public/upload/Blog/image/${blogDetail.image}`} alt="" />
            <div className={cx('content')}>
                <span>{blogDetail.content}</span>
            </div>
            <Comment listComment={listComment} idBlog={params.id} onPostComment={handleShowCommentOnPost} />
        </div>
    )
}

export default BlogDetail
