import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')
const Charts = () => import('@/views/Charts')
const Wallet = () => import('@/views/wallet/Wallet')
const WalletMonitor = () => import('@/views/wallet/WalletMonitor')
const Accounts = () => import('@/views/accounts/Accounts')
const Account = () => import('@/views/accounts/Account')
const QRCodes = () => import('@/views/sandbox/QRCodes')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')

Vue.use(Router)

function configRoutes() {
  return [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: DefaultContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'statistics',
          name: 'Statistics',
          component: Charts
        },
      ]
    },
    {
      path: '/wallet',
      name: 'Wallet',
      component: DefaultContainer,
      children: [
        {
          path: 'balances',
          name: 'Wallet Balances',
          component: Wallet
        },
        {
          path: 'monitor',
          name: 'Wallet Monitor',
          component: WalletMonitor
        },
        {
          path: 'accounts',
          meta: { label: 'Accounts'},
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Accounts,
            },
            {
              path: ':id',
              meta: { label: 'Account Details'},
              name: 'Account',
              component: Account,
            },
          ]
        },
      ]
    },
    {
      path: '/sandbox',
      name: 'Sandbox',
      component: DefaultContainer,
      children: [
        {
          path: 'qrcodes',
          name: 'QR Codes',
          component: QRCodes
        },
      ]
    },
    {
      path: '/errors',
      redirect: '/errors/404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
      ]
    }
  ]
}

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})
