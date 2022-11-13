import { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import * as fetchApi from 'utils/api'

export const LoginContext = createContext({})

export function LoginProvider({ children }) {
    const [dataUser, setDataUser] = useState({})
    const [userLogin, setUserLogin] = useState({})

    useEffect(() => {
        if (localStorage.getItem('userToken')) {
            setUserLogin({ token: JSON.parse(localStorage.getItem('userToken')), info: JSON.parse(localStorage.getItem('userInfo')) })
        }
    }, [])

    const postLogin = async (inputsValue) => {
        const res = await fetchApi.post('login', inputsValue)
        setDataUser(res)
        return res
    }

    const handleLogout = () => {
        localStorage.removeItem('userToken')
        localStorage.removeItem('userInfo')
        setDataUser({})
        setUserLogin({})

        toast.warn('Đăng xuất thành công!', {
            position: 'top-center',
            theme: 'dark'
        })
    }

    useEffect(() => {
        if (dataUser?.response === 'success') {
            localStorage.setItem('userToken', JSON.stringify(dataUser.success.token))
            localStorage.setItem('userInfo', JSON.stringify(dataUser.Auth))
            setUserLogin({ token: dataUser.success.token, info: dataUser.Auth })
        }
    }, [dataUser])

    // useEffect(() => {
    //     console.log(userLogin)
    // }, [userLogin])

    return <LoginContext.Provider value={{ dataUser, postLogin, userLogin, handleLogout }}>{children}</LoginContext.Provider>
}
