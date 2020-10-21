import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () =>import('../views/home/Home')
const Category = () =>import('../views/category/Category')
const Shopcar = () =>import('../views/shopcar/ShopCar')
const Profile = () =>import('../views/profile/Profile')

Vue.use(VueRouter)


const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/category',
    name: 'Category',
    component: Category
  },
  {
    path: '/shopcar',
    name: 'Shopcar',
    component: Shopcar
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  }
]

const router = new VueRouter({
  routes,
})

export default router
