<template>
  <div class="app">
    <DefaultHeader/>
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader/>
        <SidebarForm/>
        <SidebarNav :navItems="nav"></SidebarNav>
        <SidebarFooter/>
        <SidebarMinimizer/>
      </AppSidebar>
      <main class="main">
        <Breadcrumb :list="breadCrumbs"/>
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
      <AppAside fixed>
        <!--aside-->
        <NotificationSidebar/>
      </AppAside>
    </div>
    <DefaultFooter/>
  </div>
</template>

<script>
import nav from '@/_nav'
import { Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, SidebarNav, Aside as AppAside, Breadcrumb } from '@coreui/vue'
import NotificationSidebar from '@/components/containers/NotificationSidebar'
import DefaultHeaderDropdownAccnt from '@/components/containers/DefaultHeaderDropdownAccnt'
import DefaultHeader from '@/components/containers/DefaultHeader'
import DefaultFooter from '@/components/containers/DefaultFooter'

export default {
  name: 'app',
  components: {
    AppSidebar,
    AppAside,
    Breadcrumb,
    NotificationSidebar,
    DefaultHeaderDropdownAccnt,
    SidebarForm,
    SidebarFooter,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer,
    DefaultFooter,
    DefaultHeader
  },
  data() {
    return {
      nav: nav.items
    }
  },
  created() {
    this.initialize()
  },
  destroyed() {
    this.uninitialize()
  },
  computed: {
    name() {
      return this.$route.name
    },
    breadCrumbs() {
      return this.$route.matched.filter((route) => route.name || route.meta.label)
    }
  },
  methods: {
    initialize() {
      this.$store.dispatch('initialize')
          .catch(error => console.log(error))
    },
    uninitialize() {
      this.$store.dispatch('uninitialize')
    }
  }
}
</script>

<style lang="scss">
  // CoreUI Icons Set
  @import '~@coreui/icons/css/coreui-icons.min.css';
  /* Import Font Awesome Icons Set */
  $fa-font-path: '~font-awesome/fonts/';
  @import '~font-awesome/scss/font-awesome.scss';
  /* Import Simple Line Icons Set */
  $simple-line-font-path: '~simple-line-icons/fonts/';
  @import '~simple-line-icons/scss/simple-line-icons.scss';
  /* Import Flag Icons Set */
  @import '~flag-icon-css/css/flag-icon.min.css';
  /* Import Bootstrap Vue Styles */
  @import '~bootstrap-vue/dist/bootstrap-vue.css';
  // Import Main styles for this application
  @import 'assets/scss/style';
</style>
