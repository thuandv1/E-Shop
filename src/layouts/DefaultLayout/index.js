import Footer from 'layouts/components/Footer'
import Header from 'layouts/components/Header'
import { ToastContainer } from 'react-toastify'

function DefaultLayout({ children }) {
    return (
        <>
            <Header />
            <div>{children}</div>
            <Footer />
        </>
    )
}

export default DefaultLayout
