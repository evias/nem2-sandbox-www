import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () => import('@/components/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')
const Charts = () => import('@/views/Charts')
const Wallet = () => import('@/views/wallet/Wallet')
const WalletMonitor = () => import('@/views/wallet/WalletMonitor')
const Accounts = () => import('@/views/accounts/Accounts')
const Account = () => import('@/views/accounts/Account')
const QRCodes = () => import('@/views/sandbox/QRCodes')
const Spammer = () => import('@/views/sandbox/Spammer')
const Page404 = () => import('@/views/static/Page404')
const Page500 = () => import('@/views/static/Page500')

Vue.use(Router)

function configRoutes() {
  return [
    {
      path: '/',
      redirect: '/dashboard',
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
        {
          path: 'spammer',
          name: 'Network Spammer',
          component: Spammer
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
    },
    // redirect anything else to 404
    {
      path: '*',
      name: '404',
      component: Page404
    },
  ]
}

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})
