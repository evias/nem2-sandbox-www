<template>
  <div>
    <b-row>
      <b-col md="12">
        <Card
            class="card-f card-full-width"
            :loading="loadingWallet"
        >
          <template #title>
            <div><i class='fa fa-credit-card'></i> Wallet</div>
          </template>
          <template #control>
            <div>
              <b-link href="#" class="card-header-action btn-setting">
                <i class="icon-refresh"></i>
              </b-link>
            </div>
          </template>
          <template #body>
            <PublicAccountInput v-model="walletInput"
                                ref="walletInput"
                                @input="setLoading(true)"
                                @changed="setAddress"
                                @error="setLoading(false)" />
          </template>
        </Card>
      </b-col>
    </b-row>

    <TransactionList v-if="hasValidAddress"
                     :address="currentAddress"
                     :perPage="10" />
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

// internal dependencies
import Card from '@/components/containers/Card'
import PublicAccountInput from '@/components/nem2/PublicAccountInput'
import TransactionList from '@/components/nem2/TransactionList'
import Helpers from '../../Helpers'

export default {
  name: 'WalletTransactions',
  components: {
    PublicAccountInput,
    TransactionList,
    Card,
  },
  data: function () {
    return {
      loadingWallet: false,
      walletInput: '',
      currentAddress: '',
      hasValidAddress: false,
    }
  },
  computed: {
    ...mapGetters({
      networkType: 'network/networkType',
    })
  },
  async mounted() {
    await this.$store.dispatch('initialize')
  },
  created() {
    this.$refs.walletInput.focus()
  },
  methods: {
    setAddress(address) {
      this.currentAddress = address
      this.hasValidAddress = true
      this.setLoading(false)
    },
    setLoading(loading) {
      this.loadingWallet = !!loading
    }
  }
}
</script>

<style>
</style>
