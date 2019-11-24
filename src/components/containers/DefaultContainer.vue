<template>
  <div class="page">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'DefaultContainer',
  components: {},
  data () {
    return {
      info: 1
    }
  }
}
</script>
