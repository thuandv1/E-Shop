import Header from 'layouts/components/Header'

function DefaultLayout({ children }) {
    return (
        <>
            <Header />
            <div>{children}</div>
        </>
    )
}

export default DefaultLayout
