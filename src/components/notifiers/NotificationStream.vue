<template>
  <b-list-group :class="classList"
                v-if="items.length">
    <b-list-group-item class="list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small">
      <slot name="title" />
    </b-list-group-item>

    <div class="notification-items">
      <b-list-group-item href="#" class="list-group-item-divider"
        v-for="notification in items"
        :key="notification.time" 
        :class="classByVariant(notification.variant)"
      >
        <slot name="item" v-bind:notification="notification">
          <GenericNotification :notification="notification" />
        </slot>
      </b-list-group-item>
    </div>

    <div class="notification-archived text-center"
         v-if="archivedItems.length && !visibleArchived">
      <b-link class="card-header-action btn-minimize" @click="visibleArchived = !visibleArchived">
        <i class="icon-arrow-down"></i>&nbsp;More
      </b-link>
    </div>

    <b-collapse id="collapseArchived" v-model="visibleArchived">
      <b-list-group-item href="#" class="list-group-item-divider"
        v-for="notification in archivedItems"
        :key="notification.time" 
        :class="classByVariant(notification.variant)"
      >
        <slot name="item" v-bind:notification="notification">
          <GenericNotification :notification="notification" />
        </slot>
      </b-list-group-item>
    </b-collapse>

    <div class="notification-archived text-center"
         v-if="visibleArchived">
      <b-link class="card-header-action btn-minimize" @click="visibleArchived = !visibleArchived">
        <i class="icon-arrow-up"></i>&nbsp;Hide archived
      </b-link>
    </div>
  </b-list-group>
</template>

<script>
// internal dependencies
import GenericNotification from '@/components/notifiers/GenericNotification'
import { eventBus } from '../../main'
import Helpers from '../../Helpers'
import NotificationHandler from '../../infrastructure/NotificationHandler'

export default {
  name: 'NotificationStream',
  components: {
    GenericNotification,
  },
  props: {
    event: {
      type: String,
      default: []
    }
  },
  data() {
    return {
      items: [],
      archivedItems: [],
      visibleArchived: false,
    }
  },
  computed: {
    classList() {
      return [
        'list-group-accent',
        !this.items.length ? 'hidden' : ''
      ]
    }
  },
  created() {
    if (!this.event || !this.event.length) {
      return ;
    }

    eventBus.$on(this.event, (object, variant) => {
      const handler = NotificationHandler.handlerByEvent(this.event)
      const response = handler(object, variant)

      this.items.unshift({...response})

      if (this.items.length > 5) {
        this.archivedItems.unshift(this.items.pop());
      }
    })
  },
  methods: {
    classByVariant(variant) {
      return {
        'list-group-item-accent-warning': variant === 'warning',
        'list-group-item-accent-success': variant === 'success',
        'list-group-item-accent-danger': variant === 'danger',
        'list-group-item-accent-info': variant === 'info',
      }
    }
  }
}
</script>
