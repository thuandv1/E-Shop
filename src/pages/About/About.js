import images from 'assets/images'
import BannerDefault from 'components/BannerDefault'
import Feature from 'layouts/components/Feature'
import AboutDesc from 'pages/components/AboutDesc'
import AboutVideoApp from 'pages/components/AboutVideoApp'

function About() {
    return (
        <>
            <BannerDefault title={'#KnowUs'} desc={'Read all case studies about our products!'} image={images.bannerAbout} />
            <AboutDesc />
            <AboutVideoApp />
            <Feature />
        </>
    )
}

export default About
