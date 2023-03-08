import DefaultLayout from 'layouts/DefaultLayout'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { publicRoutes } from 'routes'

function App() {
    return (
        <Router>
            <div className="App">
                <ToastContainer progressClassName="toastProgress" bodyClassName="toastBody" />
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component
                        let Layout = DefaultLayout

                        if (route.layout) {
                            Layout = route.layout
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        )
                    })}
                </Routes>
            </div>
        </Router>
    )
}
console.log('thuandv1')

export default App
