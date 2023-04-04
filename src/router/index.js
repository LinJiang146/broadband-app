import Vue from 'vue'
import VueRouter from 'vue-router'



import Index from '../views/Index.vue'
import Commission from '../components/main/Commission.vue'
import ExceptionData from '../components/main/ExceptionData.vue'

import RunData from '../components/main/RunData.vue'
import Sign from '../components/main/Sign.vue'
// import UserData from '../components/main/UserData.vue'
import Welcome from '../components/main/Welcome.vue'
import ComponentIndex from '../components/main/Index.vue'
import CommissionEstimates from '../components/main/CommissionEstimates.vue'
import WalletManagement from '../components/main/WalletManagement.vue'
import OperationalOverview from '../components/main/OperationalOverview.vue'
import MissionLobby from '../components/main/MissionLobby.vue'




import Menu from '../views/app/Menu.vue'
import Mission from '../views/app/Mission.vue'
import Wallet from '../views/app/Wallet.vue'
import UserData from '../views/app/UserData.vue'
import Package from '../views/app/Package.vue'
import Map from '../views/app/Map.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/welcome',

  },
  {
    path: '/index',
    name: 'index',
    component: Index,
    children: [
      {
        name: 'menu',
        path: 'menu',
        component: Menu
      },
      {
        name: 'mission',
        path: 'mission',
        component: Mission
      },
      {
        name: 'wallet',
        path: 'wallet',
        component: Wallet
      },
      {
        name: 'userData',
        path: 'userData',
        component: UserData
      },
      {
        name: 'package',
        path: 'package',
        component: Package
      },
      {
        name: 'map',
        path: 'map',
        component: Map
      },





      {
        name: 'Commission',
        path: 'Commission',
        component: Commission
      },
      {
        name: 'exceptionData',
        path: 'exceptionData',
        component: ExceptionData
      },

      {
        name: 'runData',
        path: 'runData',
        component: RunData
      },
      // {
      //   name: 'userData',
      //   path: 'userData',
      //   component: UserData
      // },
      {
        name: 'componentIndex',
        path: 'componentIndex',
        component: ComponentIndex
      },
      {
        name: 'commissionEstimates',
        path: 'commissionEstimates',
        component: CommissionEstimates
      },
      {
        name: 'walletManagement',
        path: 'walletManagement',
        component: WalletManagement
      },
      {
        name: 'operationalOverview',
        path: 'operationalOverview',
        component: OperationalOverview
      },
      {
        name: 'missionLobby',
        path: 'missionLobby',
        component: MissionLobby
      },

    ]
  },
  {
    name: 'sign',
    path: '/sign',
    component: Sign
  },
  {
    name: 'welcome',
    path: '/welcome',
    component: Welcome
  }
]

const router = new VueRouter({
  routes
})

export default router
