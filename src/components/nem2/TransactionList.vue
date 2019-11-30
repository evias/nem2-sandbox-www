<template>
  <div>
    <Card
        class="card-f card-full-width"
    >
      <template #title>
        <div><i class='fa fa-list'></i> Transactions</div>
      </template>
      <template #control>
        <div>
          <b-link href="#" class="card-header-action btn-setting">
            <i class="icon-refresh"></i>
          </b-link>
        </div>
      </template>
      <template #body>
        <b-table :hover="true" :striped="true" :bordered="false" :small="false" :fixed="false"
                :busy="loadingTransactions"
                :items="items"
                :fields="fields"
                :current-page="currentPage"
                :per-page="perPage"
                @row-clicked="openDetailsModal"
        >
          <template v-slot:table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Loading...</strong>
            </div>
          </template>
        </b-table>
        <nav>
          <MoreLessPagination :action="'wallet/fetchTransactions'"
                              :actionParameters="{
                                address: address,
                                pageSize: perPage,
                                id: lastTransactionId
                              }"
                              :perPage="perPage"
                              :rowCount="getRowCount()"
                              :currentPage="currentPage"
                              @more-clicked="nextPage()"
                              @less-clicked="prevPage()" />
        </nav>
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

// internal dependencies
import Card from '@/components/containers/Card'
import MoreLessPagination from '@/components/controls/MoreLessPagination'
import Helpers from '../../Helpers.js'

export default {
  name: 'TransactionList',
  components: {
    Card,
    MoreLessPagination,
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
      fields: [
        {
          key: 'hash',
          label: 'Transaction Hash',
          formatter: (value, key, item) => {
            const hash = item.transactionInfo.hash
            return hash.substr(0, 6) + '...' + hash.substr(-6)
          },
          sortable: true
        },
        {
          key: 'type',
          sortable: true
        },
        {
          key: 'height',
          label: 'Block Height',
          formatter: (value, key, item) => {
            return item.transactionInfo.height
          },
          sortable: true
        },
        {
          key: 'fee',
          label: 'Max Fee',
          formatter: (value, key, item) => {
            return item.maxFee
          },
          sortable: false
        },
      ],
      currentPage: 1,
      loadingTransactions: true,
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
      return this.$store.getters['wallet/confirmedTransactions']
    },
    lastTransactionId() {
      const items = this.items.slice(); // copy-assign
      if (!items.length) {
        return null
      }

      return items.pop().transactionInfo.id
    }
  },
  async created() {
    this.loadingTransactions = true
    if (!this.address || !this.address.length) {
      this.loadingTransactions = false
      return ;
    }

    // 1) open websocket channels
    await this.$store.dispatch('wallet/initialize', this.address)

    // 2) fetch recent transactions
    await this.$store.dispatch('wallet/fetchTransactions', {
      address: this.address,
      pageSize: this.perPage,
      id: null,
    })
    this.loadingTransactions = false
  },
  methods: {
    getRowCount () {
      return this.items.length
    },
    openDetailsModal(item, index, button) {
      this.detailsModal.title = `Row index: ${index}`
      this.detailsModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.detailsModal.id, button)
    },
    resetDetailsModal() {
      this.detailsModal.title = ''
      this.detailsModal.content = ''
    },
    nextPage() {
      ++this.currentPage
    },
    prevPage() {
      --this.currentPage
    }
  }
}
</script>

<style>
</style>
