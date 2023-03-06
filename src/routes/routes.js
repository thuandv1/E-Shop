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
import BlogDetail from 'pages/BlogDetail'
import MyAccount from 'pages/MyAccount'
import CreateProduct from 'pages/CreateProduct'
import MyProduct from 'pages/MyProduct'
import EditProduct from 'pages/EditProduct'
import ProductDetail from 'components/ProductDetail'

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
        path: config.routes.blogdetail,
        component: BlogDetail
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
    },
    {
        path: config.routes.account,
        component: MyAccount
    },
    {
        path: config.routes.addproduct,
        component: CreateProduct
    },
    {
        path: config.routes.myproduct,
        component: MyProduct
    },
    ,
    {
        path: config.routes.editproduct,
        component: EditProduct
    },
    {
        path: config.routes.productdetail,
        component: ProductDetail
    }
]

const privateRoutes = []

export { publicRoutes, privateRoutes }
