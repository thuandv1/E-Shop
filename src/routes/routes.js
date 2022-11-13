import config from 'config'

//Layouts
import FormOnly from 'layouts/FormOnly'
import HomeLayout from 'layouts/HomeLayout/HomeLayout'

//Pages
import Home from 'pages/Home'
import Blog from 'pages/Blog'
import About from 'pages/About'
import Cart from 'pages/Cart'
import LoginForm from 'pages/LoginForm'
import RegisterForm from 'pages/RegisterForm'
import Shop from 'pages/Shop'
import DefaultLayout from 'layouts/DefaultLayout'

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
        path: config.routes.cart,
        component: Cart
    },
    {
        path: config.routes.login,
        component: LoginForm
    },
    {
        path: config.routes.register,
        component: RegisterForm
    }
]

const privateRoutes = []

export { publicRoutes, privateRoutes }
