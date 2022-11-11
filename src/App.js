import DefaultLayout from 'layouts/DefaultLayout'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { publicRoutes } from 'routes'

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        console.log(route)
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

export default App
