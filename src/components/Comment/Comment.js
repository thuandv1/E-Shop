import { theme } from 'antd'
import images from 'assets/images'
import classNames from 'classnames/bind'
import { LoginContext } from 'Context/LoginContext'
import { useContext, useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import api from 'utils/api'
import styles from './Comment.module.scss'

const cx = classNames.bind(styles)
function Comment({ listComment, idBlog, onPostComment }) {
    const { userLogin } = useContext(LoginContext)
    const [idComment, setIdComment] = useState(0)
    const [comment, setComment] = useState('')

    const rootComment = listComment.filter((comment) => comment.id_comment === 0)

    const handleShowreply = (idRoot) => listComment.filter((comment) => comment.id_comment === idRoot)

    const handleReply = (idCmtReply) => {
        document.querySelector('#comment-input').focus()
        setIdComment(idCmtReply)
    }

    let config = {
        headers: {
            Authorization: 'Bearer ' + userLogin.token,
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json'
        }
    }

    const handlePostComment = async () => {
        if (userLogin.token) {
            if (comment === '') {
                toast.warn('Vui lòng nhập bình luận! ', {
                    position: 'bottom-left',
                    theme: 'light'
                })
            } else {
                const formData = new FormData()
                formData.append('id_blog', idBlog)
                formData.append('id_user', userLogin.info.id)
                formData.append('name_user', userLogin.info.name)
                formData.append('id_comment', idComment)
                formData.append('comment', comment)
                formData.append('image_user', userLogin.info.avatar)

                await api.post(`blog/comment/${idBlog}`, formData, config).then()
                setComment('')
                setIdComment(0)
                onPostComment()
            }
        } else {
            toast.warn('Vui lòng đăng nhập để bình luận! ', {
                position: 'top-right',
                theme: 'light'
            })
        }
    }

    return (
        <div className={cx('comment', 'div-m1')}>
            <h4 className={cx('comment-title')}>{listComment.length} RESPONSE</h4>
            {listComment.length > 0 &&
                rootComment.map((item) => (
                    <div key={item.id}>
                        <div className={cx('first-comment', 'comment-item')}>
                            <img src={`http://localhost:8080/laravel/public/upload/user/avatar/${item.image_user}`} alt="" />
                            <div>
                                <div className={cx('post-meta')}>
                                    <ul>
                                        <li style={{ color: 'var(--primary-color)', fontWeight: 500 }}>
                                            <i className="fa fa-user"></i> {item.name_user}
                                        </li>
                                        <li>
                                            <i className="fa-solid fa-lock"></i>
                                            {item.updated_at.split(' ', 2)[1]}
                                        </li>
                                        <li>
                                            <i className="fa fa-calendar"></i> {item.updated_at.split(' ', 2)[0]}
                                        </li>
                                    </ul>
                                </div>
                                <span className={cx('comment-content')}>{item.comment}</span>
                                <span className={cx('comment-reply')} onClick={() => handleReply(item.id)}>
                                    <i className="fa fa-reply"></i>Replay
                                </span>
                            </div>
                        </div>
                        {handleShowreply(item.id).map((el) => (
                            <div key={el.id} className={cx('second-comment', 'comment-item')}>
                                <img src={`http://localhost:8080/laravel/public/upload/user/avatar/${el.image_user}`} alt="" />
                                <div>
                                    <div className={cx('post-meta')}>
                                        <ul>
                                            <li style={{ color: 'var(--primary-color)', fontWeight: 500 }}>
                                                <i className="fa fa-user"></i> {el.name_user}
                                            </li>
                                            <li>
                                                <i className="fa-solid fa-lock"></i>
                                                {el.updated_at.split(' ', 2)[1]}
                                            </li>
                                            <li>
                                                <i className="fa fa-calendar"></i> {el.updated_at.split(' ', 2)[0]}
                                            </li>
                                        </ul>
                                    </div>
                                    <span className={cx('comment-content')}>{el.comment}</span>
                                    <span className={cx('comment-reply')} onClick={() => handleReply(item.id)}>
                                        <i className="fa fa-reply"></i>Replay
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}

            <div className={cx('reply-form')}>
                <h4 className={cx('reply-title')}>Leave a reply</h4>
                <span className={cx('reply-yourcomment')}>Your comment</span>
                <textarea
                    name="comment"
                    id="comment-input"
                    cols="30"
                    rows="10"
                    value={comment}
                    onChange={(ev) => setComment(ev.target.value.trimStart())}
                ></textarea>
                <button className={cx('normal', 'reply-btn')} onClick={handlePostComment}>
                    POST
                </button>
            </div>
        </div>
    )
}

export default Comment
