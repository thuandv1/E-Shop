import { useContext } from 'react'
import { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import * as fetchAPI from 'utils/api'
import { LoginContext } from './LoginContext'

export const CartContext = createContext({})

export function CartProvider({ children }) {
    const [productCart, setProductCart] = useState({})
    const { userLogin } = useContext(LoginContext)

    //get data cart user
    useEffect(() => {
        userLogin.info &&
            localStorage.getItem(`${userLogin?.info?.id}-cart`) &&
            setProductCart(JSON.parse(localStorage.getItem(`${userLogin?.info?.id}-cart`)))
    }, [userLogin])

    //handle add product to cart
    function handleAddCart(ev, idProduct) {
        const addCartEl = ev.target
        //check contain product in cart
        if (Object.keys(productCart).length > 0 && productCart.hasOwnProperty(idProduct)) {
            setProductCart((prev) => ({
                ...prev,
                [idProduct]: +productCart[idProduct] + 1
            }))
        } else {
            // counter qty cart
            addCartEl.setAttribute('data-count-cart', Number(addCartEl.getAttribute('data-count-cart')) + 1)

            setProductCart((prev) => ({
                ...prev,
                [idProduct]: +addCartEl.getAttribute('data-count-cart')
            }))
        }
        //toast notify
        toast.success('Đã thêm vào giỏ hàng!', {
            position: 'bottom-right',
            theme: 'dark'
        })
    }

    //handle remove product from cart
    const handleDeleteProduct = (idProduct) => {
        setProductCart((prev) => {
            const coppyObj = { ...prev }
            delete coppyObj[idProduct]
            return coppyObj
        })
    }

    //handle counter up and down qty product
    const handleQtyUp = (productId, productQty) => {
        setProductCart((prev) => ({
            ...prev,
            [productId]: +productQty + 1
        }))
    }

    const handleQtyDown = (productId, productQty) => {
        setProductCart((prev) => ({
            ...prev,
            [productId]: +productQty - 1
        }))
    }

    //end

    //save data cart user to local
    useEffect(() => {
        userLogin.info && localStorage.setItem(`${userLogin.info.id}-cart`, JSON.stringify(productCart))

        //check qty product cart = 0 -> delete product
        Object.keys(productCart).map((key, el) => {
            if (productCart[key] == 0) {
                setProductCart((prev) => {
                    const coppyObj = { ...prev }
                    delete coppyObj[key]
                    return coppyObj
                })
            }
        })
    }, [productCart])

    return (
        <CartContext.Provider value={{ productCart, setProductCart, handleAddCart, handleQtyUp, handleQtyDown, handleDeleteProduct }}>
            {children}
        </CartContext.Provider>
    )
}
