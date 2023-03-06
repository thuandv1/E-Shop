import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal, Select } from 'antd'
import classNames from 'classnames/bind'
import { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as fetchAPI from 'utils/api'
import FeturedProduct from 'pages/components/ListProduct'

import styles from './ProductDetail.module.scss'
import ListProduct from 'pages/components/ListProduct'
import BannerOnlyHome from 'pages/components/BannerOnlyHome'
import { CartContext } from 'Context/CartContext'

const cx = classNames.bind(styles)
function ProductDetail() {
    const params = useParams()
    const { handleAddCart } = useContext(CartContext)

    const [sProduct, setSProduct] = useState({})
    const [imgProduct, setImgProduct] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [imgCurrent, setImgCurrent] = useState('')
    const mainImgEl = useRef()
    const zoomerEl = useRef()

    useEffect(() => {
        fetchAPI
            .get(`product/detail/${params.id}`)
            .then((res) => {
                res.response === 'success' && setSProduct(res.data)
            })
            .catch((err) => console.log('err server', err))
    }, [params.id])

    useEffect(() => {
        sProduct.image && setImgProduct(JSON.parse(sProduct.image))
    }, [sProduct])

    useEffect(() => {
        window.scrollTo(0, 0)
    })

    //handle select size product
    const handleSelectSize = (sizeProduct) => {
        sizeProduct && console.log(sizeProduct)
    }

    //handle change image small to main image
    const handleChangeImgClick = (ev) => {
        mainImgEl.current.src = ev.target.src
        setImgCurrent(ev.target.src)
        // ev.target.parentElement.className.add(styles['active'])
    }

    //handle zoom and view main img
    const handleZoomMainImg = (ev) => {
        const zoom = ev.target
        const x = (ev.nativeEvent.offsetX / ev.target.clientWidth) * 100
        const y = (ev.nativeEvent.offsetY / ev.target.clientHeight) * 100
        const leftX = zoom.offsetLeft
        const posX = ev.pageX - zoom.offsetLeft - 200
        const posY = ev.pageY - zoom.offsetTop

        // console.log(x, y, posX, posY)
        zoomerEl.current.style.cssText = `
                display: block;
                position: absolute;
            	background-image: url(${zoom.src});
            	background-size: ${zoom.width * 3}px ${zoom.height * 3}px;
            	background-position : ${x}% ${y}%;
            	left: ${posX}px;
            	top: ${posY}px;
                z-index: 9999;
            `
    }

    const handleHideZoomImg = (ev) => {
        zoomerEl.current.style.cssText = `display: none;`
    }

    useEffect(() => {
        imgProduct.length > 0 && setImgCurrent(imgProduct[0])
    }, [imgProduct])

    return (
        <>
            <div className={cx('prodetails', 'div-p1')}>
                <div className={cx('product-single___img')}>
                    <img
                        ref={mainImgEl}
                        src={`http://localhost:8080/laravel/public/upload/user/product/${sProduct.id_user}/${imgProduct[0]}`}
                        width="100%"
                        className={cx('mainImg')}
                        alt=""
                        onClick={() => setShowModal(true)}
                    />
                    <Modal
                        title=""
                        centered
                        closeIcon={<FontAwesomeIcon className={cx('close-icon')} icon={faClose} />}
                        open={showModal}
                        onOk={() => {
                            console.log('hehe')
                        }}
                        onCancel={() => setShowModal(false)}
                        width={'65%'}
                        footer={''}
                    >
                        <div className={cx('imgZoom')}>
                            <img src={mainImgEl?.current?.src} alt="" onMouseMove={handleZoomMainImg} onMouseLeave={handleHideZoomImg} />
                            <div ref={zoomerEl} className={cx('zoomer')}></div>
                        </div>
                    </Modal>
                    <div className={cx('product-single__img-about')}>
                        {imgProduct.map(
                            (item, index) =>
                                index < 4 && (
                                    <div
                                        key={index}
                                        className={cx('img-about-col', {
                                            active: imgCurrent.includes(item) ? true : false
                                        })}
                                    >
                                        <img
                                            src={`http://localhost:8080/laravel/public/upload/user/product/${sProduct.id_user}/${item}`}
                                            width="100%"
                                            className={cx('img-small')}
                                            alt=""
                                            onClick={handleChangeImgClick}
                                        />
                                    </div>
                                )
                        )}
                    </div>
                </div>
                <div className={cx('product-single__details')}>
                    <h6>Home / T-Shirt</h6>
                    <h4 className={cx('sproduct-name')}>{sProduct.name}</h4>
                    <h2>
                        <span className={cx('sproduct-price')}>{sProduct?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ₫'}</span>
                    </h2>
                    <Select
                        className={cx('sproduct-size')}
                        defaultValue="Select Size"
                        style={{ width: '28%' }}
                        options={[
                            {
                                value: 'XXL',
                                label: 'XXL'
                            },
                            {
                                value: 'S',
                                label: 'S'
                            },
                            {
                                value: 'M',
                                label: 'M'
                            }
                        ]}
                        onChange={handleSelectSize}
                    />
                    <input className={cx('quantity-input')} type="number" defaultValue={1} />
                    <div className={cx('quantity-group')}>
                        <span className={cx('quantity-down')}>-</span>
                        <span className={cx('quantity-up')}>+</span>
                    </div>
                    <button onClick={(ev) => handleAddCart(ev, sProduct.id)} className={cx('normal', 'add-cart')}>
                        Add To Cart
                    </button>
                    <h4>Product Details</h4>
                    <span>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi, obcaecati tempora libero blanditiis explicabo, natus iure
                        exercitationem assumenda sapiente, officiis sit! Delectus voluptatibus reiciendis sed excepturi facilis similique, suscipit
                        fuga. Minima rerum reiciendis eius tempora non recusandae laboriosam harum sed officiis ullam, aperiam veritatis, totam
                        dolorum. Eveniet minus explicabo quas, repellendus natus temporibus sapiente ea nesciunt, facere commodi illo quod.
                    </span>
                </div>
            </div>
            <ListProduct title={'Fetured Products'} desc={'Summer Collection New Morden Design'} qtyItem={4} />
            <BannerOnlyHome />
        </>
    )
}

export default ProductDetail
