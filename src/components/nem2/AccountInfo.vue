<template>
  <Card
      class="card-f card-full-width"
  >
    <template #title>
      <div><i class='fa fa-user'></i> Account Information</div>
    </template>
    <template #control>
      <div>
        <b-link href="#" class="card-header-action btn-setting">
          <i class="icon-refresh"></i>
        </b-link>
      </div>
    </template>
    <template #body>
      <b-table :hover="true" :striped="false" :bordered="false" :small="false" :fixed="false"
               :stacked="true"
               :busy="loadingInformation"
               :items="items"
               @row-clicked="rowClicked"
      >
        <template v-slot:table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>
      </b-table>
    </template>
  </Card>
</template>

<script>
import {mapGetters} from 'vuex';

// internal dependencies
import Card from '@/components/containers/Card'
import Helpers from '../../Helpers.js'

export default {
  name: 'AccountInfo',
  components: {
    Card,
  },
  props: {
    address: {
      type: String,
      default: ''
    },
    perPage: {
      type: Number,
      default: 10
    },
  },
  data() {
    return {
      loadingInformation: true,
    }
  },
  computed: {
    ...mapGetters({
      networkType: 'network/networkType',
    }),
    items() {
      const accountInfo = this.$store.getters['wallet/accountInfo']
      if (accountInfo === null) {
        return []
      }

      const formattedInfo = (({
        address,
        addressHeight,
        publicKey,
        publicKeyHeight,
        accountType,
        linkedAccountKey,
        importance,
        importanceHeight,
      }) => ({
        address,
        addressHeight,
        publicKey,
        publicKeyHeight,
        accountType,
        linkedAccountKey,
        importance,
        importanceHeight,
      }))(accountInfo)

      return [formattedInfo]
    }
  },
  async created() {
    this.loadingInformation = true
    if (!this.address || !this.address.length) {
      this.loadingInformation = false
      return ;
    }

    // 1) open websocket channels
    await this.$store.dispatch('wallet/initialize', this.address)

    // 2) fetch account info
    await this.$store.dispatch('wallet/fetchInfo', this.address)
    this.loadingInformation = false
  },
  methods: {
    rowClicked (item) {
      console.log("Clicked item: ", item);
    }
  }
}
</script>

<style>
</style>
