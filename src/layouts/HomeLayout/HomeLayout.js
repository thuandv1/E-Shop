import BannerSignUp from 'components/BannerSignUp'
import BannerHero from 'layouts/components/BannerHero'
import Feature from 'layouts/components/Feature'
import Footer from 'layouts/components/Footer'
import Header from 'layouts/components/Header'

function HomeLayout({ children }) {
    return (
        <>
            <Header />
            <BannerHero />
            {children}
            <BannerSignUp />
            <Footer />
        </>
    )
}

export default HomeLayout
