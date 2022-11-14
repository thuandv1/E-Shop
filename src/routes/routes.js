import config from 'config'

//Layouts
import HomeLayout from 'layouts/HomeLayout/HomeLayout'

//Pages
import Home from 'pages/Home'
import Shop from 'pages/Shop'
import Blog from 'pages/Blog'
import Cart from 'pages/Cart'
import About from 'pages/About'
import Contact from 'pages/Contact'

//Public routes
const publicRoutes = [
    {
        path: config.routes.home,
        component: Home,
        layout: HomeLayout
    },
    {
        path: config.routes.shop,
        component: Shop
    },
    {
        path: config.routes.blog,
        component: Blog
    },
    {
        path: config.routes.about,
        component: About
    },
    {
        path: config.routes.contact,
        component: Contact
    },
    {
        path: config.routes.cart,
        component: Cart
    }
]

const privateRoutes = []

export { publicRoutes, privateRoutes }
