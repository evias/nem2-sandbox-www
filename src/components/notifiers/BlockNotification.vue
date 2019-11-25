<template>
  <div>
    <div v-html="notification.message"></div>
    <small class="text-muted mr-3">
      <i class="icon-calendar"></i>&nbsp;
      <a target="_blank"
         alt="View on Explorer"
         href="#"
         @click="openExplorer()">{{notification.time}}</a>
    </small>
  </div>
</template>

<script>
// internal dependencies
import { eventBus } from '../../main'
import Helpers from '../../Helpers'

export default {
  name: 'BlockNotification',
  props: {
    notification: {
      type: Object,
      default: () => { return { message: '', time: '', height: 1 }; }
    }
  },
  methods: {
    openExplorer() {
      const baseUrl = this.$store.getters['network/explorerUrl']
      const detailsUrl = baseUrl + '/block/' + this.notification.height
      return window.open(detailsUrl, '_blank')
    }
  }
}
</script>