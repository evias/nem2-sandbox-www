<template>
  <b-tabs>
    <b-tab>
      <template slot="title">
        <i class='icon-list'></i>
      </template>
      <b-list-group class="list-group-accent"
                    v-if="notifications.length">
        <b-list-group-item class="list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small">
          General
        </b-list-group-item>
        <b-list-group-item 
            v-for="notification in notifications"
            :key="notification.message"
            :class="{
              'list-group-item-accent-warning': notification.variant === 'warning',
              'list-group-item-accent-success': notification.variant === 'success',
              'list-group-item-accent-danger': notification.variant === 'danger',
              'list-group-item-accent-info': notification.variant === 'info',
            }"
            href="#" 
            class="list-group-item-divider">
          <div v-html="notification.message"></div>
          <small class="text-muted mr-3">
            <i class="icon-calendar"></i>{{notification.time}}
          </small>
        </b-list-group-item>
      </b-list-group>

      <b-list-group class="list-group-accent">
        <b-list-group-item class="list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small">
          Blocks
        </b-list-group-item>
        <b-list-group-item 
            v-for="notification in blockNotifications"
            :key="notification.message"
            :class="{
              'list-group-item-accent-warning': notification.variant === 'warning',
              'list-group-item-accent-success': notification.variant === 'success',
              'list-group-item-accent-danger': notification.variant === 'danger',
              'list-group-item-accent-info': notification.variant === 'info',
            }"
            href="#" 
            class="list-group-item-divider">
          <div v-html="notification.message"></div>
          <small class="text-muted mr-3">
            <i class="icon-calendar"></i>{{notification.time}}
          </small>
        </b-list-group-item>
      </b-list-group>
    </b-tab>
    <b-tab>
      <template slot="title">
        <i class='icon-settings'></i>
      </template>
      <div class="p-3">
        <h6>Settings</h6>
        <div class="aside-options">
          <div class="clearfix mt-4">
            <small><b>Live Block Listener</b></small>
            <c-switch color="success" label variant="pill" size="sm" class="float-right" checked />
          </div>
          <div>
            <small class="text-muted">When this option ON, a websocket subscription will be opened to listen to newly added blocks on the network.</small>
          </div>
        </div>
        <hr>
        <h6>System Utilization</h6>
        <div class="text-uppercase mb-1 mt-4">
          <small><b>CPU Usage</b></small>
        </div>
        <b-progress height={} class="progress-xs" variant="info" :value="25"></b-progress>
        <small class="text-muted">348 Processes. 1/4 Cores.</small>
        <div class="text-uppercase mb-1 mt-2">
          <small><b>Memory Usage</b></small>
        </div>
        <b-progress height={} class="progress-xs" variant="warning" :value="70"></b-progress>
        <small class="text-muted">11444GB/16384MB</small>
        <div class="text-uppercase mb-1 mt-2">
          <small><b>SSD 1 Usage</b></small>
        </div>
        <b-progress height={} class="progress-xs" variant="danger" :value="95"></b-progress>
        <small class="text-muted">243GB/256GB</small>
        <div class="text-uppercase mb-1 mt-2">
          <small><b>SSD 2 Usage</b></small>
        </div>
        <b-progress height={} class="progress-xs" variant="success" :value="10"></b-progress>
        <small class="text-muted">25GB/256GB</small>
      </div>
    </b-tab>
  </b-tabs>
</template>

<script>
import { Switch as cSwitch } from '@coreui/vue'

// internal dependencies
import { eventBus } from '../../main'
import Helpers from '../../Helpers'

export default {
  name: 'NotificationSidebar',
  components: {
    cSwitch
  },
  data() {
    return {
      notifications: [],
      blockNotifications: [],
    }
  },
  created() {
    eventBus.$on('addNotification', (message, variant) => {
      this.notifications.unshift({
        variant,
        message,
        time: timestampToTime((new Date()).valueOf())
      })
    })

    eventBus.$on('newBlock', block => {
      this.blockNotifications.unshift({
        variant: 'success',
        message: 'New block added: <strong>#' + block.height.compact() + '</strong>',
        time: Helpers.timestampToTime(block.timestamp.compact())
      })

      if (this.blockNotifications.length > 5) {
        this.blockNotifications.pop();
      }
    })
  }
}
</script>
