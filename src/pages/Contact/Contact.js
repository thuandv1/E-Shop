import images from 'assets/images'
import BannerDefault from 'components/BannerDefault'
import BannerSignUp from 'components/BannerSignUp'
import ContactFormDetail from 'components/ContactFormDetail'
import ContactMap from 'components/ContactMap'

function Contact() {
    return (
        <>
            <BannerDefault title={"#let's_talk"} desc={'LEAVE A MESSAGE, We love to hear from you!'} image={images.bannerContact} />
            <ContactMap />
            <BannerSignUp />
            <ContactFormDetail />
        </>
    )
}

export default Contact
