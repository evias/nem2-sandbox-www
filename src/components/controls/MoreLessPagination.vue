<template>
  <b-button-group>
    <b-button v-if="enableMore"
              :variant="variant"
              @click="dispatchAction">
      <i class="nav-icon icon-plus"></i>&nbsp;More
    </b-button>

    <b-button v-if="enableLess" 
              @click="dispatchLess">
      <i class="nav-icon icon-minus"></i>&nbsp;Less
    </b-button>
  </b-button-group>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'MoreLessPagination',
  props: {
    action: {
      type: String,
      default: ''
    },
    actionParameters: {
      type: Object,
      default: {}
    },
    perPage: {
      type: Number,
      default: 10
    },
    rowCount: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    },
    variant: {
      type: String,
      default: 'outline-info'
    }
  },
  data() {
    return {};
  },
  computed: {
    enableMore() {
      const totalPages = Math.floor(this.rowCount / this.perPage)
      return this.currentPage <= totalPages
    },
    enableLess() {
      return this.currentPage > 1
    }
  },
  methods: {
    async dispatchAction() {
      if (!this.action.length) {
        return ;
      }

      const parameters = [this.action, this.actionParameters]
      await this.$store.dispatch.apply(this.$store, parameters)
      this.$emit('more-clicked')
    },
    async dispatchLess() {
      await this.$emit('less-clicked')
    }
  }
}
</script>
