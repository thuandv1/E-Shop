import classNames from 'classnames/bind'
import styles from './Home.module.scss'

import Feature from 'layouts/components/Feature'
import BannerOnly from 'pages/components/BannerOnly'
import BannerOnlyHome from 'pages/components/BannerOnlyHome'
import FeturedProduct from 'pages/components/ListProduct'

const cx = classNames.bind(styles)
function Home() {
    return (
        <>
            <Feature />
            <FeturedProduct title={'Fetured Products'} desc={'Summer Collection New Morden Design'} />
            <BannerOnly />
            <FeturedProduct title={'New Arrivals'} desc={'Summer Collection New Morden Design'} />
            <BannerOnlyHome />
        </>
    )
}

export default Home
