<template>
  <div>
    <div v-html="notification.message"></div>
    <small class="text-muted mr-3">
      <i class="icon-calendar"></i> {{notification.time}}
    </small>
  </div>
</template>

<script>
// internal dependencies
import { eventBus } from '../../main'
import Helpers from '../../Helpers'

export default {
  name: 'GenericNotification',
  props: {
    notification: {
      type: Object,
      default: { variant: 'info', message: '', time: '' }
    }
  }
}
</script>