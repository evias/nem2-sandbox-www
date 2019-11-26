<template>
  <div>
    <Card
        class="card-f card-full-width"
    >
      <template #title>
        <div><i class='fa fa-user'></i> Account Balances</div>
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
                :busy="loadingBalances"
                :items="items"
                :fields="fields"
                @row-clicked="openDetailsModal"
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

    <!-- Details modal -->
    <b-modal :id="detailsModal.id"
             :title="detailsModal.title"
             ok-only
             @hide="resetDetailsModal">
      <pre>{{ detailsModal.content }}</pre>
    </b-modal>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import {UInt64} from 'nem2-sdk'

// internal dependencies
import Card from '@/components/containers/Card'
import Helpers from '../../Helpers.js'

export default {
  name: 'MosaicList',
  components: {
    Card,
  },
  props: {
    address: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      fields: [
        {
          key: 'id',
          label: 'Mosaic Id',
          formatter: (value, key, item) => {
            const id = value.id
            return (new UInt64([id.lower, id.higher])).toHex()
          },
          sortable: true
        },
        {
          key: 'amount',
          label: 'Balance',
          sortable: true
        },
      ],
      loadingBalances: true,
      detailsModal: {
        id: 'transaction-detail-modal',
        title: '',
        content: ''
      }
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

      const formattedInfo = (({mosaics}) => ({mosaics}))(accountInfo)
      return formattedInfo.mosaics
    }
  },
  async created() {
    this.loadingBalances = true
    if (!this.address || !this.address.length) {
      this.loadingBalances = false
      return ;
    }

    // 1) open websocket channels
    await this.$store.dispatch('wallet/initialize', this.address)

    // 2) fetch account info
    await this.$store.dispatch('wallet/fetchInfo', this.address)
    this.loadingBalances = false
  },
  methods: {
    openDetailsModal(item, index, button) {
      this.detailsModal.title = `Row index: ${index}`
      this.detailsModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.detailsModal.id, button)
    },
    resetDetailsModal() {
      this.detailsModal.title = ''
      this.detailsModal.content = ''
    },
  }
}
</script>

<style>
</style>
