import { LoginContext } from 'Context/LoginContext'
import { useContext, useEffect, useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import { toast } from 'react-toastify'
import api, * as fetchAPI from 'utils/api'

function Rate({ idBlog }) {
    const [dataRate, setDataRate] = useState({})
    const [rateBlog, setRateBlog] = useState(0)
    const { userLogin } = useContext(LoginContext)

    useEffect(() => {
        fetchAPI.get(`blog/rate/${idBlog}`).then((res) => setDataRate(res.data))
    }, [])

    const totalRateBlog = () => {
        setRateBlog(Object.keys(dataRate).reduce((s, item) => (s = s + Number(dataRate[item].rate)), 0) / Object.keys(dataRate).length)
    }

    useEffect(() => {
        Object.keys(dataRate).length > 0 && totalRateBlog()
    }, [dataRate])

    let config = {
        headers: {
            Authorization: 'Bearer ' + userLogin.token,
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json'
        }
    }

    const handleRateBlog = async (rate) => {
        if (!userLogin) {
            toast.warning('Vui lòng đăng nhập để đánh giá!', {
                position: 'top-right',
                theme: 'dark'
            })
        } else {
            const formData = new FormData()
            formData.append('user_id', userLogin.info.id)
            formData.append('blog_id', idBlog)
            formData.append('rate', rate)

            await api.post(`blog/rate/${idBlog}`, formData, config).then((res) => console.log(res))
            fetchAPI.get(`blog/rate/${idBlog}`).then((res) => setDataRate(res.data))

            toast.success('Bạn đã đánh giá thành công!', {
                position: 'top-right',
                theme: 'dark'
            })
        }
    }

    return (
        <div>
            <Rating onClick={handleRateBlog} initialValue={rateBlog} transition allowFraction size={20} style={{ marginRight: '12px' }} />
            <span>{Object.keys(dataRate).length} Vote</span>
        </div>
    )
}

export default Rate
