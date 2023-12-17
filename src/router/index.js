import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginRg from '../views/LoginRg.vue'
import TransactionOrder from '../views/fulfillment/TransactionOrder.vue'
import CreateStock from '../views/ware_house/CreateStock.vue'
import DashBoard from '../views/ware_house/DashBoard.vue'
import Dispatching from '../views/ware_house/Dispatching.vue'
import OrderLogs from '../views/ware_house/OrderLog.vue'
import HomeView from '../views/ware_house/OrderReport.vue'
import Report from '../views/ware_house/Report.vue'
import Stock from '../views/ware_house/Stock.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/order-report',
    name: 'order-report',
    component: HomeView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashBoard
    // component: () => import(/* webpackChunkName: "about" */ '../views/DashBoard.vue')
  },
  {
    path: '/',
    name: 'login-rg',
    component: LoginRg
  },
  {
    path: '/transaction-order',
    name: 'transaction-order',
    component: TransactionOrder
  },
  {
    path: '/stock',
    name: 'stock',
    component: Stock
  },
  {
    path: '/create-stock',
    name: 'create-stock',
    component: CreateStock
  },
  {
    path:'/report',
    name: 'report',
    component: Report
  },
  {
    path:'/dispatching',
    name: 'dispatching',
    component: Dispatching
  },
  {
    path:'/order-logs',
    name: 'order-logs',
    component: OrderLogs
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
