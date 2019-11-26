<template>
  <b-tabs>
    <b-tab>
      <template slot="title">
        <i class='icon-list'></i>
      </template>

      <NotificationStream :event="'addNotification'">
        <template #title>General</template>
      </NotificationStream>

      <NotificationStream :event="'newConnection'">
        <template #title>Connections</template>
      </NotificationStream>

      <NotificationStream :event="'newBlock'">
        <template v-slot:title="titleProps">Blocks</template>
        <template v-slot:item="itemProps">
          <BlockNotification :notification="itemProps.notification" />
        </template>
      </NotificationStream>
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
import NotificationStream from '@/components/notifiers/NotificationStream'
import BlockNotification from '@/components/notifiers/BlockNotification'
import GenericNotification from '@/components/notifiers/GenericNotification'
import { eventBus } from '../../main'
import Helpers from '../../Helpers'

export default {
  name: 'NotificationSidebar',
  components: {
    cSwitch,
    NotificationStream,
    GenericNotification,
    BlockNotification,
  },
  data() {
    return {
      info: 1
    }
  }
}
</script>
